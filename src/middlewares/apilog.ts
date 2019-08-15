
import { Response } from 'koa'
import { Request } from 'koa-bodyparser'
function reqParse (req: Request): object {
  const { method, query, body, url } = req
  return {
    method,
    url,
    query,
    body
  }
}

function resParse (res: Response): any {
  return res.body
}

export default ({ reqP = reqParse, resP = resParse } = {}) => async (ctx, next): Promise<void> => {
  const util = ctx.app.$util
  try {
    util.log.info('[apilog-MiddleWares] request => %j', reqP(ctx.request))
    await next()
    util.log.info('[apilog-MiddleWares] response => %j', resP(ctx.response))
  } catch (error) {
    console.log(ctx.response.status, error)
    let { message, stack, statusCode } = error
    ctx.status = statusCode || 500
    if (statusCode < 500) {
      if (statusCode === 401) {
        message = message || '用户验证失败，请重新登录'
      }
    }
    ctx.body = {
      result: -1,
      msg: message
    }
    util.log.error('[apilog-MiddleWares] req =>  %j, error => %j', reqP(ctx.request), { message, stack, statusCode })
  }
}
