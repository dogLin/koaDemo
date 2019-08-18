import * as Router from '../decorator/route'
console.log('TestController===>')
export default class TestController {
  @Router.get('/test')
  public static testMethod (ctx): void {
    ctx.body = { result: 1, data: 'testMethod' }
  }
}
