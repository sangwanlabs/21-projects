const authService = require("./auth.service")

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body)
    return res.status(201).json(result)
  } catch (error) {
    return next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

const getProfile = async (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      balance: req.user.balance,
    },
  })
}

module.exports = {
  register,
  login,
  getProfile,
}

