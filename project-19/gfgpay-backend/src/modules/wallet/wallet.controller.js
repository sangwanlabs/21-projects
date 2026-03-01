const walletService = require("./wallet.service")

const getBalance = async (req, res, next) => {
  try {
    const result = await walletService.getBalance(req.user._id)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const addMoney = async (req, res, next) => {
  try {
    const result = await walletService.addMoney(req.user._id, req.body.amount)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const transferMoney = async (req, res, next) => {
  try {
    const result = await walletService.transferMoney(req.user._id, req.body)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const getTransactions = async (req, res, next) => {
  try {
    const result = await walletService.getTransactions(req.user._id)
    return res.status(200).json({ transactions: result })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getBalance,
  addMoney,
  transferMoney,
  getTransactions,
}

