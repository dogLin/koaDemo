export default {
  log: {
    folder: process.env.LOGFOLDEER || 'D:/Time_MANA_logs/'
  },
  wx: {
    appid: 'wx3cd650131270c7ec',
    secret: 'dc37e8c10cdc8101107a547c42698e5f'
  },
  jwt: {
    secret: 'time_mana_20190501'
  },
  mysql: {
    host: 'localhost',
    user: 'doglin',
    password: '123456',
    database: 'time_master'
  },
  rsa: {
  },
  token_header: 'time_token'
}
