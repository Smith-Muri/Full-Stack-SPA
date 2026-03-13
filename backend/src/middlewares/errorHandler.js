// middleware to catch errors and send JSON response

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    details: err.details || null,
  });
}

module.exports = errorHandler;
