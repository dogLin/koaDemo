import { router, controller } from '../decorator'

@controller('/user')
export class UserController {
  @router.get('/id')
  getUserById (ctx): void {
    ctx.body = {
      result: `${ctx.req.query}`
    }
  }
}
