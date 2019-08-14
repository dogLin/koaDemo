const userRouter = require('koa-router')()

userRouter.post('/login', async(ctx, next) => {
  const {log, wx, token: tokenUtil} = ctx.app.$util
  let {code, fullUserInfo} = ctx.request.body
  let res = await wx.login(code, fullUserInfo)
  let token =  await tokenUtil.create({openId: res.openid})
  log.info('token ===> %s',token)
  ctx.body = {
    result: 1,
    data: {
      token,
    }
  }
})

module.exports = userRouter