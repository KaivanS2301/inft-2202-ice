// filepath: src/server/utils/logger.js
import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'inft-2202-ice' },
    transports: [
        new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, '../../logs/combined.log') })
    ]
});

export default logger;