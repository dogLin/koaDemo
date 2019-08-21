import * as Application from 'koa'

export interface MyApplication extends Application{
  $util: any;
}
export interface Request extends Application.Request {
  body: any;
}
