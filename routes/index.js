const { Router } = require('express');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundRouter = require('./notFoundPages');
const { createUserSchema, loginSchema } = require('../validationSchemas/joiValidationSchemas');

const router = Router();

router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);

router.use(auth);

// Роут для выхода
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(usersRouter);
router.use(moviesRouter);
router.use(notFoundRouter);

module.exports = router;
