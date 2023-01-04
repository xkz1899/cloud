const jwt = require("jsonwebtoken")
const db = require("../db")

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {expiresIn: "2h"})
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {expiresIn: "30d"})
    return { accessToken, refreshToken }
  }

  verifyAccessToken(accessToken) {
    const userData = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS)
    return userData
  }

  verifyRefreshToken(refreshToken) {
    const userData = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH)
    return userData
  }

  async saveToken(refreshToken, userId) {
    const token = await db.query(`SELECT * FROM tokens WHERE user_id = $1`, [userId])
    if (token.rows[0]) {
      const updateToken = await db.query(`UPDATE tokens SET refresh_token = $1 WHERE user_id = $2 RETURNING *`, [refreshToken, userId])
      return updateToken
    }
    const newToken = await db.query(`INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2) RETURNING *`, [userId, refreshToken])
    return newToken
  }

  async removeToken(refreshToken) {
    await db.query(`DELETE FROM tokens WHERE refresh_token = $1`, [refreshToken])
  }

  async findToken(refreshToken) {
    const token = await db.query(`SELECT * FROM tokens WHERE refresh_token = $1`, [refreshToken])
    return token
  }

}

module.exports = new TokenService()
