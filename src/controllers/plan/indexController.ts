import { MyContext } from './../../types/koaExtends'
import { router, controller, middlewares } from '../../decorator'

@controller('/plan')
export default class TestController {
  @router.get('')
  public async login (ctx: MyContext): Promise<void> {
    const { app } = ctx
    const user = ctx.state
    ctx.body = { result: 1, data: ctx.state }
  }
}
