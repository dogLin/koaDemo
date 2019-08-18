import * as Router from 'koa-router'
import { MyApplication } from '../types/koaExtends'
const decoratorRouter = new Router()
export function get (url: string): (target, name, descriptor) => void {
  console.log('decoratorRouter get ====>')
  return function (target, name, descriptor): void {
    decoratorRouter.get(url, descriptor.value)
    console.log('decoratorRouter get ====>')
  }
}

export function registryRouter (app: MyApplication): void {
  app.use(decoratorRouter.routes()).use(decoratorRouter.allowedMethods())
}
