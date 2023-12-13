const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const config = require('./utils/config');
const { rateLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet());
app.use(cors({
  origin:
  ['http://localhost:3000', 'http://localhost:3001',
    'https://sha.nomoredomainsmonster.ru', 'https://api.sha.nomoredomainsmonster.ru',
    'http://sha.nomoredomainsmonster.ru', 'http://api.sha.nomoredomainsmonster.ru'],
  credentials: true,
}));

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(rateLimiter);
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(config.PORT, () => {
  console.log(`На порте: ${config.PORT}`);
});
