const router = require("express").Router()
const controller = require("./seat.controller")

router.post("/bulk", controller.bulkCreate)

module.exports = router
