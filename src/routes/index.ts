import * as Router from 'koa-router'
import WxRouter from './wx'
const router = new Router()
export default function (app): void {
  WxRouter(router)
  app.use(router.routes()).use(router.allowedMethods())
}
