const router = require("express").Router()
const controller = require("./screen.controller")

router.post("/", controller.create)
router.get("/:theaterId", controller.getByTheater)

module.exports = router