const { createLogger, transports, format } = require('winston');


const logger = createLogger({

    transports: [

        new transports.Console({
            level: 'debug',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'combined.log',
            level: 'debug',
            format: format.combine(format.timestamp(), format.json())
        }),



    ],
});


module.exports = logger