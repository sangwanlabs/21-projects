require("dotenv").config()
const app = require("./src/app")
const prisma = require("./src/utils/prisma")

const PORT = process.env.PORT || 3000

const bootstrap = async () => {
  try {
    await prisma.$connect()
    console.log("Database connected")

    const server = app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to connect database:", error.message || error)
    process.exit(1)
  }
}

bootstrap()
