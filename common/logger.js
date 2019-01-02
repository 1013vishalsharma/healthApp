/**
 * logging configuration file
 */

const { createLogger, transports, format } = require('winston')
const fs = require('fs')
const config = require('config')

const logLevel = config.get('LOG_LEVEL')
const logFile = './appLog'

const logger = createLogger({
    level: logLevel,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({
            filename: logLevel,
            format: format.combine(
                format.timestamp(),
                format.simple(),
                format.colorize()
            )
        })
    ]
})


module.exports = logger