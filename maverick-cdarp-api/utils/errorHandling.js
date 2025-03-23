// utils/errorHandling.js: Error handling utilities
const logger = require('./logger');

const handleError = (res, error, statusCode = 500) => {
  logger.error(`Error: ${error.message}`);
  res.status(statusCode).json({ error: error.message });
};

module.exports = { handleError };