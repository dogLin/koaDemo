// const jwt = require('jsonwebtoken')
import * as jwt from 'jsonwebtoken'
import Config from '../../config'

export default {
  create (userInfo: object): string {
    return jwt.sign(userInfo, Config.jwt.secret)
  },
  parse (token: string): string | object {
    return jwt.verify(token, Config.jwt.secret)
  }
}
