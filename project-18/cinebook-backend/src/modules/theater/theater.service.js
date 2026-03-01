const prisma = require("../../utils/prisma")

exports.create = (data) => prisma.theater.create({ data })

exports.getAll = () =>
  prisma.theater.findMany({ include: { screens: true } })
