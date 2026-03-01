const prisma = require("../../utils/prisma")

exports.create = (data) => prisma.screen.create({ 
  data,
  include: { seats: true }
})

exports.getByTheater = (theaterId) =>
  prisma.screen.findMany({ 
    where: { theaterId },
    include: { seats: true, shows: true }
  })