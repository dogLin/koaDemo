const jwt = require('jsonwebtoken')
const Config = require('../config')

module.exports = {
  async create(userInfo) {
    return jwt.sign(userInfo, Config.jwt.secret)
  },
  async parse(token) {
    return jwt.verify(token, Config.jwt.secret)
  }
}