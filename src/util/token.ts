// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'
import Config from '../../config'

export default {
  async create (userInfo: object): Promise<string> {
    return jwt.sign(userInfo, Config.jwt.secret)
  },
  async parse (token: string): Promise<object> {
    return jwt.verify(token, Config.jwt.secret)
  }
}
