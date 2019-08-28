// import * as mysql from 'mysql'
// import config from '../../config'
// const mysqlConfig = config.mysql
// console.log(__dirname)
// const connection = mysql.createConnection({
//   host: mysqlConfig.host,
//   user: mysqlConfig.user,
//   password: mysqlConfig.password,
//   database: mysqlConfig.database
// })
// connection.connect((err) => {
//   if (err) {
//     console.log('MYSQL connection error=>', err)
//   }
//   console.log('MYSQL connected as id ' + connection.threadId)
// })

// export default connection
import { Sequelize, Table } from 'sequelize-typescript'
import config from '../../config'
import * as path from 'path'
const mysqlConfig = config.mysql

const sequelize = new Sequelize({
  database: mysqlConfig.database,
  dialect: 'mysql',
  username: mysqlConfig.user,
  password: mysqlConfig.password,
  host: mysqlConfig.host,
  models: [path.resolve(__dirname, '../modle/*.model.ts')]
})
