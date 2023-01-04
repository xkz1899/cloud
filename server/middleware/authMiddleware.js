const tokenService = require("../service/tokenService")
const ApiError = require("./ApiError")

module.exports = function (req, res, next) {
	try {
		const headerAuthorization = req.headers.authorization

		if (!headerAuthorization) {
			return next(ApiError.UnauthorizedError())
		}
		const accessToken = headerAuthorization.slice(" ")[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}
		const userData = tokenService.verifyAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}
		req.user = userData
		next()
	} catch (err) {
		return next(ApiError.UnauthorizedError())
	}
}
