const express = require("express")
const app = express()

app.use(express.json())

app.use("/movies", require("./modules/movie/movie.routes"))
app.use("/theaters", require("./modules/theater/theater.routes"))
app.use("/screens", require("./modules/screen/screen.routes"))
app.use("/seats", require("./modules/seat/seat.routes"))
app.use("/shows", require("./modules/show/show.routes"))
app.use("/bookings", require("./modules/booking/booking.routes"))

module.exports = app
