const ApiError = require("./ApiError")

module.exports = function (err, req, res, next) {
	if (err instanceof ApiError) {
		res.status(err.status).json({ message: err.message, errors: err.errors })
	}
	res.status(500).json({ message: "Неопределенная ошибка." })
}
