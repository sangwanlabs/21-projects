const service = require("./show.service")

exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const result = await service.getOne(+req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}