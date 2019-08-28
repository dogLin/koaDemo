import * as Koa from 'koa'
import middleware from './src/middlewares'
import { initUtil } from './src/util'
import { MyApplication, MyContext } from './src/types/koaExtends'
import { registryRouter } from './src/decorator/route'
import './src/util/db'
const app = new Koa()
// 挂载工具方法到app上
initUtil(app)
// 中间件
middleware(app)

registryRouter(app as MyApplication)
app.use(async (ctx) => {
  ctx.status = 404
  ctx.body = {
    result: -1,
    msg: 'Not Found'
  }
})

app.listen(process.env.PORT || '3000')

app.on('error', async (err, ctx: MyContext) => {
  ctx.app.$util.log.error('server error', err, ctx)
  ctx.body = {
    result: 0,
    msg: err.message
  }
})

console.log(`the server is starting at port ${process.env.PORT || '3000'}`)
