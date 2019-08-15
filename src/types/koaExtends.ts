import * as Application from 'koa'

export interface MyApplication extends Application{
  $util: any;
}
