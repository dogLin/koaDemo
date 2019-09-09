import { MyContext } from './../../types/koaExtends'
import { router, controller } from '../../decorator'
import { Plan } from '../../modle'
@controller('/plan')
export default class TestController {
  @router.get('')
  public async getPlans (ctx: MyContext): Promise<void> {
    const { app } = ctx
    const { user } = ctx.state
    const { id, pageno, pagesize } = ctx.query
    if (id) {
      const plan = await Plan.findByPk(id)
      ctx.body = { result: 1, data: { plan } }
      return
    }
    const plans = await Plan.findByPage({ where: { userId: user.id } }, pageno, pagesize)
    ctx.body = { result: 1, data: plans }
  }

  @router.post('')
  public async createPlans (ctx: MyContext): Promise<void> {
    const plan = new Plan({
      ...ctx.request.body,
      userid: ctx.state.user.id
    })
    await plan.save()
    ctx.body = { result: 1, data: { plan } }
  }
}
