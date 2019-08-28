async function ErrorHandler (ctx, next): Promise<void> {
  try {
    await next()
  } catch (error) {
    // ctx.app.$util.log.error('server error', error)
    ctx.response.status = error.statusCode || error.status || 500
    ctx.body = {
      result: 0,
      msg: error.message
    }
  }
}
export default ErrorHandler
