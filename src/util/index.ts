import wx from './wx'
import log from './log'
import token from './token'
const util = {
  wx,
  log,
  token
}
export const initUtil = (app): void => {
  app.$util = util
}

export default {
  ...util,
  initUtil
}
