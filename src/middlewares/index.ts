import apilog from './apilog'
import * as bodyParser from 'koa-bodyparser'

export default (app): void => {
  app.use(bodyParser())
  app.use(apilog())
}
