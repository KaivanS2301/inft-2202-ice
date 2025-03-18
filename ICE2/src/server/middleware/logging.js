// filepath: src/server/middleware/logging.js
import logger from '../utils/logger.js';

export function logRequest(req, res, next) {
    const { method, path } = req;
    const currentTime = new Date().toISOString();
    logger.info(`Method: ${method}, Path: ${path}, Time: ${currentTime}`);
    next();
}