import { MyContext } from './../../types/koaExtends'
import { router, controller } from '../../decorator'
import { Clock, Plan } from '../../modle'
@controller('/clock')
export default class TestController {
  @router.get('')
  public async getClocks (ctx: MyContext): Promise<void> {
    const { planId } = ctx.query
    const clocks = await Plan.findAll({ where: { planId } })
    ctx.body = { result: 1, data: { clocks } }
  }

  // @router.post('')
  // public async createPlans (ctx: MyContext): Promise<void> {
  // }
}
