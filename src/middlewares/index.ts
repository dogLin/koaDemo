import apilog from './apilog'
import testMid from './test'
import * as bodyParser from 'koa-bodyparser'

export default (app): void => {
  app.use(bodyParser())
  // app.use(apilog())
}

export { apilog, testMid }
