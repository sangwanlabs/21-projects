const prisma = require("../../utils/prisma")

exports.create = (data) => prisma.movie.create({ data })

exports.getAll = () => prisma.movie.findMany()
