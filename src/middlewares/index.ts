import apilog from './apilog'
import handlerError from './handlerError'
import * as bodyParser from 'koa-bodyparser'
import userToken from './userToken'

export default (app): void => {
  // app.use(handlerError)
  app.use(bodyParser())
  app.use(apilog())
  app.use(userToken)
}

export { apilog, handlerError }
