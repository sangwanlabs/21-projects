const prisma = require("../../utils/prisma")

exports.bulkCreate = async ({ screenId, layout }) => {
  const seats = []

  layout.forEach(row => {
    row.numbers.forEach(number => {
      seats.push({
        row: row.name,
        number,
        type: row.type,
        screenId
      })
    })
  })

  return prisma.seat.createMany({ data: seats })
}
