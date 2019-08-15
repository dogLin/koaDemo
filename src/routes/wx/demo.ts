import * as Router from 'koa-router'
import { Request } from 'koa-bodyparser'
import { MyApplication } from '../../types/koaExtends'
const userRouter = new Router()

userRouter.post('/login', async (ctx) => {
  const { log, wx, token: tokenUtil } = (ctx.app as MyApplication).$util
  const { code, fullUserInfo } = (ctx.request as Request).body
  const res = await wx.login(code, fullUserInfo)
  const token = await tokenUtil.create({ openId: res.openid })
  log.info('token ===> %s', token)
  ctx.body = {
    result: 1,
    data: {
      token
    }
  }
})

export default userRouter
