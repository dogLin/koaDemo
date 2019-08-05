const Koa = require('koa')
const app = new Koa()
const router = require('./routes')
const { initUtil } = require('./util')
const middleware = require("./middlewares")
// 挂载工具方法到app上
initUtil(app)
// 中间件
middleware(app)
// 路由注册
router(app)
app.use(async ctx => {
  ctx.status = 404
  ctx.body = {
    result: -1,
    msg: 'Not Found'
  }
})

app.listen(process.env.PORT || '3000')

app.on('error', (err, ctx) => {
  ctx.app.$util.log.error('server error', err, ctx)
  ctx.body = {
    result: 0,
    error: err.message
  }
});

console.log(`the server is starting at port ${process.env.PORT || '3000'}`)