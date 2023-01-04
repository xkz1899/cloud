const db = require("../db")
const ApiError = require("../middleware/ApiError")
const tokenService = require("./tokenService")
const bcrypt = require("bcrypt")
const userDto = require("../dto/userDto")
const { UnauthorizedError } = require("../middleware/ApiError")

class AuthService {

  async tokenHandler(user) {
    const dtoUser = await new userDto(user)
    const tokens = await tokenService.generateTokens({...dtoUser})
    await tokenService.saveToken(tokens.refreshToken, dtoUser.id)
    return {...tokens, user: dtoUser}
  }

  async registration(email, password) {
    const candidate = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
    if (candidate.rows[0]) {
      throw ApiError.BadRequest(`Пользователь ${email} существует в базе данных.`)
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await db.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [email, hashPassword])
    return this.tokenHandler(user.rows[0])
  }

  async login(email, password) {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    if (!user.rows[0]) {
      throw ApiError.BadRequest("Неверный email.")
    }
    const passwordCompare = await bcrypt.compare(password, user.rows[0].password)
    if (!passwordCompare) {
      throw ApiError.BadRequest("Неверный пароль.")
    }
    return this.tokenHandler(user.rows[0])
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw UnauthorizedError()
    }
    const userData = await tokenService.verifyRefreshToken(refreshToken)
    const dbToken = await tokenService.findToken(refreshToken)
    if (!userData || !dbToken) {
      throw UnauthorizedError()
    }
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userData.id])
    return this.tokenHandler(user.rows[0])
  }
}

module.exports = new AuthService()
