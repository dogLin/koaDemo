import { router, controller } from '../decorator'
console.log('TestController===>')
@controller('/lin')
export default class TestController {
  @router.get('/test')
  public static testMethod (ctx): void {
    ctx.body = { result: 1, data: 'testMethod' }
  }
}
