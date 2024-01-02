const Router = require("express").Router
const authRouter = require("./authRouter")
const fileRouter = require("./fileRouter")

const router = new Router()

router.use(`/auth`, authRouter)
router.use(`/files`, fileRouter)

module.exports = router
