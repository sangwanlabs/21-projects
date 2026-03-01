const prisma = require("../../utils/prisma")

exports.create = async (data) => {
  const show = await prisma.show.create({ data })

  const seats = await prisma.seat.findMany({
    where: { screenId: data.screenId }
  })

  const showSeats = seats.map(seat => ({
    showId: show.id,
    seatId: seat.id,
    price: data.price
  }))

  await prisma.showSeat.createMany({ data: showSeats })

  return show
}

exports.getOne = (id) =>
  prisma.show.findUnique({
    where: { id },
    include: {
      movie: true,
      screen: true,
      showSeats: true
    }
  })
