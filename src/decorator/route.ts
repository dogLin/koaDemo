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

interface RouterMethods {
  get: (path) => ((target, name, descriptor) => void) | any;
  post: (path) => ((target, name, descriptor) => void) | any;
  del: (path) => ((target, name, descriptor) => void) | any;
  put: (path) => ((target, name, descriptor) => void) | any;
  options: (path) => ((target, name, descriptor) => void) | any;
  head: (path) => ((target, name, descriptor) => void) | any;
  patch: (path) => ((target, name, descriptor) => void) | any;
  all: (path) => ((target, name, descriptor) => void) | any;
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
  methods[method] = (path: string): (target, name, descriptor) => void => route({ method, path: path[0] === '/' ? path : '/' + path })
})

function registryRouter (app: MyApplication): void {
  glob.sync('*Controller.ts', { cwd: './src/controllers', matchBase: true, realpath: true }).forEach(require)
  routerMap.forEach((fun, conf) => {
    if (decoratorRouter[conf.method]) {
      console.log(conf.target)
      const prefix = conf.target._prefix || ''
      decoratorRouter[conf.method](prefix + conf.path, fun)
    }
  })
  app.use(decoratorRouter.routes()).use(decoratorRouter.allowedMethods())
}

export {
  registryRouter,
  methods as router
}
