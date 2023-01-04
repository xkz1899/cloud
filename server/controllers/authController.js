const authService = require("../service/authService")

class AuthController {
	async registration(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await authService.registration(email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 3600 * 24 * 30,
				httpOnly: true,
			})
			res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await authService.login(email, password)
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 3600 * 24 * 30,
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
			res.json({ message: "Выход осуществлён." })
		} catch (err) {
			next(err)
		}
	}
	async refresh(req, res, next) {
		const { refreshToken } = req.cookies
		const userData = await authService.refresh(refreshToken)
		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 3600 * 24 * 30,
			httpOnly: true,
		})
		res.json(userData)
		try {
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new AuthController()
