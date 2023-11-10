const errorsMessage = require('../utils/errorsMessages');

const errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? errorsMessage.SERVER_MESSAGES.SERVER_ERROR : err.message;
  res.status(statusCode).json({ message });
  next();
};

module.exports = { errorsHandler };
