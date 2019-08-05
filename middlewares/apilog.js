function reqParse (req) {
  let {method, params, body, url} = req
  return {
    method,
    url,
    params,
    body
  }
}

function resParse (res) {
  return res.body
}

module.exports = ({reqP = reqParse, resP = resParse} = {}) => async (ctx, next) => {
  const util = ctx.app.$util
  try {
    util.log.info('[apilog-MiddleWares] request => %j', reqP(ctx.request))
    await next()
    util.log.info('[apilog-MiddleWares] response => %j', resP(ctx.response))
  } catch (error) {
    console.log(ctx.response.status, error )
    let {message, stack, statusCode} = error
    ctx.status = statusCode || 500
    if (statusCode < 500) {
      if (statusCode == 401) {
        message = message || '用户验证失败，请重新登录'
      }
    }
    ctx.body = {
      result: -1,
      msg: message
    }
    util.log.error('[apilog-MiddleWares] req =>  %j, error => %j',reqP(ctx.request), {message, stack, statusCode} )
  }
}