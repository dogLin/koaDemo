import * as Router from 'koa-router'
import { MyApplication } from '../types/koaExtends'
import * as glob from 'glob'

const decoratorRouter = new Router()
const AllMethods = ['get', 'post', 'del', 'put', 'options', 'head', 'patch', 'all']
const routerMap = new Map()
function route (conf: object): (target, name, descriptor) => void {
  console.log(conf)
  return function (target, name, descriptor): void {
    routerMap.set({ ...conf, target }, target[name])
  }
}

type DecoratorFun = (target, name, descriptor) => void | any

interface RouterMethods {
  get: (path) => DecoratorFun | any;
  post: (path) => DecoratorFun | any;
  del: (path) => DecoratorFun | any;
  put: (path) => DecoratorFun | any;
  options: (path) => DecoratorFun | any;
  head: (path) => DecoratorFun | any;
  patch: (path) => DecoratorFun | any;
  all: (path) => DecoratorFun | any;
}
const methods: RouterMethods = {
  get: (path) => {},
  post: (path) => {},
  del: (path) => {},
  put: (path) => {},
  options: (path) => {},
  head: (path) => {},
  patch: (path) => {},
  all: (path) => {}
}

AllMethods.forEach(method => {
  methods[method] = (path: string): DecoratorFun => route({ method, path: path[0] === '/' ? path : '/' + path })
})

function registryRouter (app: MyApplication): void {
  glob.sync('*Controller.ts', { cwd: './src/controllers', matchBase: true, realpath: true }).forEach(require)
  routerMap.forEach((funs, conf) => {
    if (decoratorRouter[conf.method]) {
      console.log(conf.target)
      const prefix = conf.target._prefix || conf.target.prototype._prefix || ''
      decoratorRouter[conf.method](prefix + conf.path, ...toArry(funs))
    }
  })
  app.use(decoratorRouter.routes()).use(decoratorRouter.allowedMethods())
}
export const controller = (prefix: string) => {
  return (constructor): any => {
    constructor.prototype._prefix = prefix
  }
}

function toArry (arr): any[] {
  return arr instanceof Array ? arr : [arr]
}

export const middlewares = (...mids): DecoratorFun => {
  return (target, name): void => {
    target[name] = toArry(target[name])
    target[name].unshift(...mids)
  }
}

export {
  registryRouter,
  methods as router
}
