const service = require("./theater.service")

exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
}