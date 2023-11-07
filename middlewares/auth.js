require('dotenv').config();
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.jwt;
    if (!token) {
      const unauthorizedError = new UnauthorizedError('Необходима авторизация');
      return next(unauthorizedError);
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    return next();
  } catch (error) {
    const unauthorizedError = new UnauthorizedError('Неверный токен');
    return next(unauthorizedError);
  }
};

module.exports = auth;
