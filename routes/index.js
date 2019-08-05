const router = require('koa-router')()
const WxRouter = require('./wx')

module.exports = app => {
  WxRouter(router)
  app.use(router.routes()).use(router.allowedMethods())
}