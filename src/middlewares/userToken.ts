import { MyContext } from './../types/koaExtends'
import config from '../../config'
export default async function userToken (ctx: MyContext, next) {
  const token = ctx.headers[config.token_header]
  if (!token) {
    ctx.throw(401)
  }
  ctx.state.user = ctx.app.$util.token.parse(token)
  await next()
}
