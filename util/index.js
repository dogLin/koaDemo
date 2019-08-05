const wx = require('./wx')
const log = require('./log')
const token = require('./token')
const util = {
  wx,
  log,
  token
}
const initUtil = (app) => {
  app.$util = util
}

module.exports = {
  ...util,
  initUtil
}