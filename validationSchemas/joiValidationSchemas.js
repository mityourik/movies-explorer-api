const { celebrate, Joi } = require('celebrate');

const urlRegex = /https?:\/\/(www\.)?[\w-]+(\.\w+)+([/\w-._~:?#[\]@!$&'()*+,;=]+)?#?/;

const createUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

const loginSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  }),
});

const updateUserProfileSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const createMovieSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieSchema = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createUserSchema,
  loginSchema,
  updateUserProfileSchema,
  createMovieSchema,
  deleteMovieSchema,
};
