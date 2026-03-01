const express = require("express")

const authRoutes = require("../modules/auth/auth.routes")
const walletRoutes = require("../modules/wallet/wallet.routes")

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/wallet", walletRoutes)

module.exports = router

