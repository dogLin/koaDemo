import { router, controller } from '../decorator'

@controller('/user')
export class UserController {
  @router.get('/id')
  async getUserById (ctx) {
    console.log(ctx.req.query)
    ctx.body = {
      result: `${ctx.req.query}`
    }
  }
}
