const bcrypt = require("bcryptjs")

const User = require("../../models/user.model")
const generateToken = require("../../utils/generateToken")

const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const error = new Error("name, email and password are required")
    error.statusCode = 400
    throw error
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })
  if (existingUser) {
    const error = new Error("Email already registered")
    error.statusCode = 409
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = generateToken(user._id)

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
    token,
  }
}

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("email and password are required")
    error.statusCode = 400
    throw error
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    const error = new Error("Invalid credentials")
    error.statusCode = 401
    throw error
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials")
    error.statusCode = 401
    throw error
  }

  const token = generateToken(user._id)

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
    token,
  }
}

module.exports = {
  registerUser,
  loginUser,
}

