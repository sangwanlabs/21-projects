const express = require("express")

const app = express()

app.get("/test", (req, res) => {
  console.log("Test endpoint called")
  res.json({ message: "Hello World" })
})

const server = app.listen(4000, () => {
  console.log("Test server listening on port 4000")
})

setTimeout(() => {
  console.log("Shutting down test server")
  server.close()
  process.exit(0)
}, 10000)
