import apilog from './apilog'
import handlerError from './handlerError'
import testMid from './test'
import * as bodyParser from 'koa-bodyparser'

export default (app): void => {
  // app.use(handlerError)
  app.use(bodyParser())
  app.use(apilog())
}

export { apilog, handlerError, testMid }
