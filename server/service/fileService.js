const fs = require("fs")
const ApiError = require("../middleware/ApiError")
const db = require("../db")

class FileService {
	createDir(req, file) {
		const filePath = `${req.filePath}\\${file.user_id}\\${file.path}`
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath)
		} else {
			throw ApiError.BadRequest("Файл существует")
		}
	}

	async getFiles(parent, userId, sort) {
		if (!parent) {
			const files = await db.query(`SELECT * FROM files WHERE files.user_id = $1 AND files.parent_id IS NULL AND length(files.name) > 0 ORDER BY ${sort} ASC`, [userId])
			return files.rows
		} else {
			const files = await db.query(`SELECT * FROM files WHERE files.user_id = $1 AND files.parent_id = $2 ORDER BY ${sort} ASC`,[userId, parent])
			return files.rows
		}
	}

	getPath(req, file) {
		return req.filePath + "\\" + file.user_id + "\\" + file.path
	}

	deleteFile(req, file) {
		const path = this.getPath(req, file)
		if (file.type === "dir") {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path + "\\" + file.name)
		}
	}
}

module.exports = new FileService()
