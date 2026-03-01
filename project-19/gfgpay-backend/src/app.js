const express = require("express")

const routes = require("./routes")
const errorHandler = require("./middlewares/error.middleware")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  return res.json({
    message: "gfgpay backend is running",
  })
})

app.use("/api", routes)

app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found",
  })
})

app.use(errorHandler)

module.exports = app

