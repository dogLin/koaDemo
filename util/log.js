const {createLogger, format, transports} = require('winston')
const {printf, colorize, timestamp, splat, simple} = format
const config = require('../config')
const custom = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
// const levels = { 
//   error: 0, 
//   warn: 1, 
//   info: 2, 
//   verbose: 3, 
//   debug: 4, 
//   silly: 5 
// };
const logger = createLogger({
  format: format.combine(
    format(info => {
      info.level = info.level.toUpperCase()
      return info;
    })(),
    colorize(),
    timestamp(),
    splat(),
    simple(),
    custom,
    // format.json()
  ),
  // levels,
  transports: [
    new transports.Console(),
    new transports.File({ filename: `${config.log.folder}info.log`, level: "info" }),
    new transports.File({ filename: `${config.log.folder}error.log`, level: "error" }),
    new transports.File({ filename: `${config.log.folder}warn.log`, level: "warn" }),
  ],
})

module.exports = logger