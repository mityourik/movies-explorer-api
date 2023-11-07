require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = 'a535ebb78341b0962c2dd583d398b3dbe41ce3c938a591c1b0f8cf9fbabbc02b';
const envSecretKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : secretKey;
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.jwt;
    if (!token) {
      const unauthorizedError = new UnauthorizedError('Необходима авторизация');
      return next(unauthorizedError);
    }

    const payload = await jwt.verify(token, envSecretKey);
    req.user = payload;

    return next();
  } catch (error) {
    const unauthorizedError = new UnauthorizedError('Неверный токен');
    return next(unauthorizedError);
  }
};

module.exports = auth;
