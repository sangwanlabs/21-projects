const service = require("./seat.service")

exports.bulkCreate = async (req, res, next) => {
  try {
    const result = await service.bulkCreate(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}