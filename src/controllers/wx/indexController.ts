import { router, controller, middlewares } from '../../decorator'
import { User } from '../../modle'

@controller('/wx')
export default class TestController {
  @router.post('/login')
  public async login (ctx): Promise<void> {
    const { app } = ctx
    const res = await ctx.app.$util.wx.login(ctx.request.body.code, ctx.request.body.fullUserInfo)
    if (!res) {
      ctx.throw(401, '用户解析失败')
    }
    let user = await User.findOne({ where: { wxOpenId: res.openId } })
    if (!user) {
      user = new User({
        name: res.nickName,
        wxOpenId: res.openId
      })
      await user.save()
    }
    const token = app.$util.token.create({ id: user.id, wxOpenId: user.wxOpenId })
    const { pwd, wxOpenId, ...resUser } = (user.toJSON() as any)
    ctx.body = { result: 1, data: { token, user: resUser } }
  }
}
