const { createLogger, transports, format } = require('winston')

module.exports = createLogger({
    level: 'info',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({
            filename: 'combined.log',
            format: format.combine(
                format.json(),
                format.timestamp()
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: 'uncaughtExceptions.log'
        })
    ]
})
