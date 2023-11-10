const express = require('express');

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieSchema,
  deleteMovieSchema,
} = require('../validationSchemas/joiValidationSchemas');

const router = express.Router();

router.get('/movies', getAllMovies);
router.post('/movies', createMovieSchema, createMovie);
router.delete('/movies/:movieId', deleteMovieSchema, deleteMovie);

module.exports = router;
