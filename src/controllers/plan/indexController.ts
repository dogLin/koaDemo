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
    console.log(ctx.request.body)
    const plan = new Plan({
      ...ctx.request.body,
      userId: ctx.state.user.id
    })
    await plan.save()
    ctx.body = { result: 1, data: { plan } }
  }

  @router.put('/:id')
  public async updatePlan (ctx: MyContext): Promise<void> {
    const id = ctx.params.id
    if (!id) {
      ctx.throw(400)
    }
    const res = await Plan.update({
      ...ctx.request.body
    }, { where: { id } })
    ctx.body = { result: 1, data: { res } }
  }

  @router.del('/:id')
  public async deletePlan (ctx: MyContext): Promise<void> {
    const id = ctx.params.id
    if (!id) {
      ctx.throw(400)
    }
    const res = await Plan.destroy({
      where: { id }
    })
    ctx.body = { result: 1, data: { res } }
  }
}
