require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const router = require("./router")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use("/api", router)
app.use(errorMiddleware)

const start = () => {
	try {
		app.listen(PORT, () =>
			console.log(`Server started and work at port ${PORT}...`)
		)
	} catch (err) {
		console.log(err)
	}
}
start()
