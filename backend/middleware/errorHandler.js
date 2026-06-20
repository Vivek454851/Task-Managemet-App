/**
 * Centralized error handling middleware
 * Catches all unhandled errors and returns structured JSON response
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

module.exports = { errorHandler, ApiError };
