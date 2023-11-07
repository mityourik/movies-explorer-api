const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'https://diploma.nomoredomainsrocks.ru', 'https://api.diploma.nomoredomainsrocks.ru'], credentials: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`На порте: ${PORT}`);
});
