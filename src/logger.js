const { createLogger, format, transports, error } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const fs = require('fs');
const path = require('path');

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir, { recursive: true });
    } catch (error) {
        console.error(`Failed to create log directory: ${error.message}`);
    }
}

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat)
        }),
        new transports.File({ filename: path.join(logDir, 'bot.log' )}),
        new transports.File({ filename: path.join(logDir, 'errors.log'), level: error })
    ]
});

module.exports = logger;