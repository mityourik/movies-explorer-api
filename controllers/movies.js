const Movie = require('../models/movie');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('../utils/httpStatuses');
const NotFoundError = require('../errors/NotFoundError');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    return res.status(HTTP_STATUS_OK).json(movies);
  } catch (error) {
    const internalError = new InternalServerError('Ошибка на сервере');
    return next(internalError);
  }
};

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = new Movie({
      owner,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    });
    await movie.save();
    return res.status(HTTP_STATUS_CREATED).json(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationError = new BadRequestError('Переданы некорректные данные при создании ролика.');
      return next(validationError);
    }
    const internalError = new InternalServerError('На сервере произошла ошибка');
    return next(internalError);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      const notFoundError = new NotFoundError('Ролик с указанным _id не найден.');
      return next(notFoundError);
    }

    if (movie.owner.toString() !== req.user._id) {
      const forbiddenError = new ForbiddenError('Недостаточно прав для удаления ролика');
      return next(forbiddenError);
    }

    await Movie.findByIdAndDelete(movieId);
    return res.status(HTTP_STATUS_OK).json(movie);
  } catch (error) {
    const internalError = new InternalServerError('На сервере произошла ошибка');
    return next(internalError);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
