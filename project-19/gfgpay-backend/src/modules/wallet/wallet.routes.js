const express = require("express")

const walletController = require("./wallet.controller")
const authMiddleware = require("../../middlewares/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.get("/balance", walletController.getBalance)
router.post("/add-money", walletController.addMoney)
router.post("/transfer", walletController.transferMoney)
router.get("/transactions", walletController.getTransactions)

module.exports = router

