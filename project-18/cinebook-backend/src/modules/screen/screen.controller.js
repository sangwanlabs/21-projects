const service = require("./screen.service")

exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

exports.getByTheater = async (req, res, next) => {
  try {
    const result = await service.getByTheater(+req.params.theaterId)
    res.json(result)
  } catch (err) {
    next(err)
  }
}