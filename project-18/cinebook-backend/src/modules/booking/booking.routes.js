const router = require("express").Router()
const controller = require("./booking.controller")

router.post("/", controller.create)
router.get("/:id", controller.getOne)

module.exports = router