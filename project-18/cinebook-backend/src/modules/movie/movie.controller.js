const service = require("./movie.service")

exports.create = async (req, res, next) => {
  try {
    console.log("Creating movie with data:", req.body)
    const result = await service.create(req.body)
    console.log("Movie created:", result)
    res.status(201).json(result)
  } catch (err) {
    console.error("Error creating movie:", err)
    next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    console.log("Fetching all movies")
    const result = await service.getAll()
    console.log("Movies fetched:", result)
    res.json(result)
  } catch (err) {
    console.error("Error fetching movies:", err)
    next(err)
  }
}