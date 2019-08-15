import DemoRouter from './demo'
export default (router): void => {
  router.get('/', (ctx, next) => {
    ctx.body = {
      result: 1,
      data: 'welcome Wxdemo'
    }
  })
  router.use('/wx', DemoRouter.routes(), DemoRouter.allowedMethods())
}
