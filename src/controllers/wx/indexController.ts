import { router, controller, middlewares } from '../../decorator'
import { testMid } from '../../middlewares'
import { User } from '../../modle'

@controller('/wx')
export default class TestController {
  @router.post('/login')
  public async login (ctx): Promise<void> {
    const res = await ctx.app.$util.wx.login(ctx.request.body.code, ctx.request.body.fullUserInfo)
    if (!res) {
      ctx.throw(401, '用户解析失败')
    }
    const user = new User({
      name: res.nickName
    })
    await user.save()
    ctx.body = { result: 1, data: res }
  }
}
