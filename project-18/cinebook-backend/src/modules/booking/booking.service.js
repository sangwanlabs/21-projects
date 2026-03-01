const prisma = require("../../utils/prisma")

exports.create = async ({ showId, seatIds, userEmail }) => {
  return prisma.$transaction(async (tx) => {
    const seats = await tx.showSeat.findMany({
      where: {
        showId,
        seatId: { in: seatIds },
        status: "AVAILABLE"
      }
    })

    if (seats.length !== seatIds.length) {
      throw new Error("Some seats are already booked")
    }

    const total = seats.reduce((sum, s) => sum + s.price, 0)

    await tx.showSeat.updateMany({
      where: {
        showId,
        seatId: { in: seatIds }
      },
      data: { status: "BOOKED" }
    })

    return tx.booking.create({
      data: {
        userEmail,
        showId,
        totalPrice: total,
        bookingSeats: {
          create: seatIds.map(seatId => ({ seatId }))
        }
      },
      include: { bookingSeats: true }
    })
  }, {
    maxWait: Number(process.env.DB_TX_MAX_WAIT_MS || 5000),
    timeout: Number(process.env.DB_TX_TIMEOUT_MS || 10000)
  })
}

exports.getOne = (id) =>
  prisma.booking.findUnique({
    where: { id },
    include: {
      show: { include: { movie: true, screen: true } },
      bookingSeats: { include: { seat: true } }
    }
  })
