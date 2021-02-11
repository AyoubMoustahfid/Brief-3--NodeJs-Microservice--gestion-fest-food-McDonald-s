// const {createLogger, format, transports} = require('winston')
const winston = require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
            filename: 'error.log', 
            level:'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ],
    transports: [
         new winston.transports.MongoDB({
             maxsize: 555555444,
                maxFiles: 5,
             db: 'mongodb://localhost!27017/mcdonald',
             options: { useUnifiedTopology: true }
            }),
         new winston.transports.Console({
             level: 'debug'
         })
    ]
})

module.exports = logger
