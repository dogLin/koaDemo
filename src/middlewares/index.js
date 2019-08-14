const apilog = require('./apilog')
const bodyParser = require('koa-bodyparser')

module.exports = (app) => {
  app.use(bodyParser())
  app.use(apilog())
}