
const logError = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const handleError = (err, req, res, next) => {
  if (res.res.headersSent) return next(err);

  const status = err.statusCode || 500;
  const message = err.message || 'Server error.';

  return res.status(status).send({ error: message });
};

module.exports = { logError, handleError };
