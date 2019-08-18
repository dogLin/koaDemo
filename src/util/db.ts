import * as mysql from 'mysql'
import config from '../../config'
const mysqlConfig = config.mysql

const connection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
})
connection.connect((err) => {
  if (err) {
    console.log('MYSQL connection error=>', err)
  }
  console.log('MYSQL connected as id ' + connection.threadId)
})

export default connection
