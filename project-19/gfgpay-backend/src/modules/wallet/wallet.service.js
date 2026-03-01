const User = require("../../models/user.model")
const Transaction = require("../../models/transaction.model")

const parseAmount = (value) => Number(value)

const getBalance = async (userId) => {
  const user = await User.findById(userId).select("balance")

  if (!user) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }

  return { balance: user.balance }
}

const addMoney = async (userId, amount) => {
  const numericAmount = parseAmount(amount)
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    const error = new Error("Amount must be a positive number")
    error.statusCode = 400
    throw error
  }

  const user = await User.findById(userId)
  if (!user) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }

  user.balance += numericAmount
  await user.save()

  await Transaction.create({
    user: user._id,
    type: "ADD_MONEY",
    amount: numericAmount,
    balanceAfter: user.balance,
    note: "Wallet top up",
  })

  return { balance: user.balance }
}

const transferMoney = async (senderId, { toEmail, amount, note }) => {
  const numericAmount = parseAmount(amount)
  if (!toEmail) {
    const error = new Error("toEmail is required")
    error.statusCode = 400
    throw error
  }

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    const error = new Error("Amount must be a positive number")
    error.statusCode = 400
    throw error
  }

  const sender = await User.findById(senderId)
  if (!sender) {
    const error = new Error("Sender not found")
    error.statusCode = 404
    throw error
  }

  const recipient = await User.findOne({ email: toEmail.toLowerCase() })
  if (!recipient) {
    const error = new Error("Recipient not found")
    error.statusCode = 404
    throw error
  }

  if (String(sender._id) === String(recipient._id)) {
    const error = new Error("Cannot transfer to your own account")
    error.statusCode = 400
    throw error
  }

  if (sender.balance < numericAmount) {
    const error = new Error("Insufficient balance")
    error.statusCode = 400
    throw error
  }

  sender.balance -= numericAmount
  recipient.balance += numericAmount

  await sender.save()
  await recipient.save()

  await Transaction.create([
    {
      user: sender._id,
      type: "TRANSFER_OUT",
      amount: numericAmount,
      balanceAfter: sender.balance,
      counterparty: recipient._id,
      note: note || "",
    },
    {
      user: recipient._id,
      type: "TRANSFER_IN",
      amount: numericAmount,
      balanceAfter: recipient.balance,
      counterparty: sender._id,
      note: note || "",
    },
  ])

  return {
    message: "Transfer successful",
    balance: sender.balance,
  }
}

const getTransactions = async (userId) => {
  const transactions = await Transaction.find({ user: userId })
    .populate("counterparty", "name email")
    .sort({ createdAt: -1 })

  return transactions
}

module.exports = {
  getBalance,
  addMoney,
  transferMoney,
  getTransactions,
}

