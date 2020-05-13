const winston = require('winston');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, moment.utc().format("YYYY-MM-DD")+'.log');
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((i) => `${i.timestamp}  ${i.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename })
    ]
});

module.exports = logger;