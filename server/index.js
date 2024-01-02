require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const ErrorMiddleware = require("./middleware/ErrorMiddleware")
const router = require("./router")
const fileUpload = require("express-fileupload")
const filePathMiddleware = require("./middleware/filePathMiddleware")
const path = require("path")

const app = express()

const PORT = process.env.PORT || 5000

app.use(fileUpload({}))
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(filePathMiddleware(path.resolve(__dirname, "files")))
app.use(express.static("static"))
app.use("/api", router)
app.use(ErrorMiddleware)

const start = async () => {
	try {
		app.listen(PORT, () =>
			console.log(`Server started and work at port ${PORT}...`)
		)
	} catch (err) {
		console.log(err)
	}
}
start()
