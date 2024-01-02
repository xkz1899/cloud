const db = require("../db")
const fileService = require("../service/fileService")
const fs = require("fs")
const { getFiles } = require("../service/fileService")
const uuid = require("uuid")

class FileController {
	async createDir(req, res, next) {
    try {
      const { name, type, parent } = req.body
      const file = (await db.query(`INSERT INTO files (name, type, parent_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`, [name, type, parent, req.user.id])).rows[0]
      const parentFile = (await db.query(`SELECT * FROM files WHERE id = $1`, [parent])).rows[0]
      if (!parentFile) {
        const updateFile = (await db.query(`UPDATE files SET path = $1 WHERE id = $2 RETURNING *`, [name, file.id])).rows[0]
        console.log("PATH>>>>",req.filePath)
        fileService.createDir(req, updateFile)
      } else {
        const updateFile = (await db.query(`UPDATE files SET path = $1 WHERE id = $2 RETURNING *`, [`${parentFile.path}\\${file.name}`, file.id])).rows[0]
        fileService.createDir(req, updateFile)
        // await db.query(`INSERT INTO children (file_id, file_parent_id) VALUES ($1, $2)`, [file.rows[0].id, updateFile.rows[0].parent_id])
      }
      const newFile = (await db.query(`SELECT * FROM files WHERE id = $1`, [file.id])).rows[0]
      res.json(newFile)
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  }

  async getFiles(req, res, next) {
    try {
      const { sort, parent } = req.query
      let files
      if (sort) {
        files = await getFiles(parent, req.user.id, sort)
      } else {
        files = await getFiles(parent, req.user.id)
      }
      return res.json(files)
    }
    catch (err) {
      console.log(err)
      next(err)
    }
  }

  async uploadFile(req, res, next) {
e    try {
      const file = req.files.file
      const parent = (await db.query(`SELECT * FROM fils WHERE id = $1 AND user_id = $2`, [req.body.parent, req.user.id])).rows[0]
      const user = (await db.query(`SELECT * FROM users WHERE id = $1`, [req.user.id])).rows[0]
      if (user.used_space * 1 + file.size * 1 >= user.disk_space * 1) {
        return res.status(400).json("Нет свободного места.")
      }
      
      let path
      if (parent) {
        path = `${req.filePath}\\${user.id}\\${parent.path}\\${file.name}`
      } else {
        path = `${req.filePath}\\${user.id}\\${file.name}`
      }
      if(fs.existsSync(path)) {
        return res.status(400).json("Файл существует.")
      }
      file.mv(path)
      
      const type = file.name.split(".").pop()
      
      let dbFile
      if (parent) {
        dbFile = (await db.query(`INSERT INTO files (name, type, size, path, parent_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [file.name, type, file.size, parent.path, parent.id, user.id])).rows[0]
      } else {
        dbFile = (await db.query(`INSERT INTO files (name, type, size, user_id) VALUES ($1, $2, $3, $4) RETURNING *`, [file.name, type, file.size, user.id])).rows[0]
      }

      await db.query(`UPDATE users SET used_space = $1 WHERE id = $2`, [user.used_space * 1 + file.size * 1, req.user.id])

      res.json(dbFile)
    }
    catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
  async downloadFile(req, res) {
    try {
      const file = (await db.query(`SELECT * FROM files WHERE id = $1 AND user_id = $2`, [req.query.id, req.user.id])).rows[0]
      const path = req.filePath + '\\' + req.user.id + '\\' + file.path + '\\' + file.name
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.json("Ошибка загрузки.")
    }
    catch (err) {
      res.status(400).json(err)
    }
  }
  async deleteFile(req, res) {
    try {
      const user = (await db.query(`SELECT * FROM users WHERE id = $1`, [req.user.id])).rows[0]
      const file = (await db.query(`SELECT * FROM files WHERE id = $1 AND user_id = $2`, [req.query.id, req.user.id])).rows[0]
      if (!file) {
        return res.status(400).json("Файл не найден.")
      }
/*       if (file.type === "dir") {
				await fileService.childrenDelete(file)
			} */
      fileService.deleteFile(req, file)
      await db.query(`DELETE FROM files WHERE id = $1 AND user_id = $2`, [file.id, req.user.id])
      await db.query(`UPDATE users SET used_space = $1 WHERE id = $2`, [user.used_space*1 - file.size*1, user.id ])
      return res.json({message: "Файл удалён."})
    }
    catch (err) {
      res.status(400).json(err)
    }
  }
  async searchFile(req, res) {
    try {
      const { search, sort } = req.query
      let files = (await db.query(`SELECT * FROM files WHERE user_id = $1 ORDER BY ${sort} ASC`, [req.user.id])).rows
      files = files.filter(file => file.name.toLowerCase().includes(search.toLowerCase()))
      return res.json(files) 
    }
    catch (err) {
      res.status(400).json(err)
    }
  }
  async uploadAvatar(req, res) {
    try {
      const file = req.files.file
      const avatarName = uuid.v4()+".jpg"
      file.mv(process.env.STATIC_PATH + "\\" + avatarName)
      const user = (await db.query(`UPDATE users SET avatar = $1 WHERE id = $2 RETURNING *`, [avatarName, req.user.id])).rows[0]
      res.json(user)
    }
    catch (err) {
      res.status(400).json(err)
    }
  }
  async deleteAvatar(req, res) {
    try {
      const user = (await db.query(`SELECT * FROM users WHERE id = $1`, [req.user.id])).rows[0]
      fs.unlinkSync(process.env.STATIC_PATH+"\\"+user.avatar)
      const userUpdate = (await db.query(`UPDATE users SET avatar = '' WHERE id = $1 RETURNING *`, [user.id])).rows[0]
      res.json(userUpdate)
    }
    catch (err) {
      res.status(400).json(err)
    }
  }
}

module.exports = new FileController()
