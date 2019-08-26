import { router, controller, middlewares } from '../../decorator'
import { testMid } from '../../middlewares'

@controller('/wx')
export default class TestController {
  @router.post('/login')
  @middlewares(testMid)
  public async login (ctx): Promise<void> {
    const res = await ctx.app.$util.wx.login(ctx.request.body.code, ctx.request.body.fullUserInfo)
    ctx.body = { result: 1, data: res }
  }
}
