const authService = require("../service/authService")
const { validationResult } = require("express-validator")
const ApiError = require("../middleware/apiError")

class AuthController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
			}
			const { email, password } = req.body
			const userData = await authService.registration(req, email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async login(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
			}
			const { email, password } = req.body
			const userData = await authService.login(email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			await authService.logout(refreshToken)
			res.clearCookie("refreshToken")
			res.json({ message: "Выход осуществлен." })
		} catch (err) {
			next(err)
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new AuthController()
