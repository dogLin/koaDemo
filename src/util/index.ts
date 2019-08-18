import wx from './wx'
import log from './log'
import token from './token'
import Db from './db'
import * as RSA from './rsa'
const util = {
  wx,
  log,
  token,
  Db,
  RSA
}
export const initUtil = (app): void => {
  app.$util = util
}

export default {
  ...util,
  initUtil
}
