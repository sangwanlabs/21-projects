const router = require("express").Router()
const controller = require("./theater.controller")

router.post("/", controller.create)
router.get("/", controller.getAll)

module.exports = router
