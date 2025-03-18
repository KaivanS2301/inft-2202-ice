// filepath: src/server/middleware/errorHandler.js
import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
    logger.error(err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
}