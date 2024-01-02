const Router = require("express").Router
const authController = require("../controllers/authController")
const router = new Router()
const { body } = require("express-validator")

router.post(
	`/registration`,
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	authController.registration
)
router.post(
	`/login`,
	body("password").isLength({ min: 3, max: 32 }),
	authController.login
)
router.post("/logout", authController.logout)
router.post("/refresh", authController.refresh)

module.exports = router
