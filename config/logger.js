const {
    createLogger,
    transports,
    format
} = require('winston');

const {} = require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.DB_URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logger',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;
