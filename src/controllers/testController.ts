import { router, controller, middlewares } from '../decorator'
import { testMid } from '../middlewares'
console.log('TestController===>')
@controller('/lin')
export default class TestController {
  @router.get('/test')
  @middlewares(testMid)
  public static testMethod (ctx): void {
    ctx.body = { result: 1, data: 'testMethod' }
  }
}
