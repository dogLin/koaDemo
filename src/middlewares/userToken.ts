import { MyContext } from './../types/koaExtends'
import config from '../../config'
const UnAuthRouter = [
  '/wx/login'
]
export default async function userToken (ctx: MyContext, next): Promise<void> {
  if (UnAuthRouter.indexOf(ctx.path) < 0) {
    const token = ctx.headers[config.token_header]
    if (!token) {
      ctx.throw(401)
    }
    ctx.state.user = ctx.app.$util.token.parse(token)
    await next()
  } else {
    await next()
  }
}
