const USER_MESSAGES = {
  CONFLICT_USERDATA: 'Пользователь с таким email уже существует.',
  BAD_REQUEST: 'Переданы некорректные данные при создании пользователя!',
  SUCCESS_LOGIN: 'Вы успешно авторизировались!',
  SUCCESS_LOGOUT: 'Выход!',
  NOT_FOUND: 'Пользователь с указанным _id не найден!',
  INVALID_TOKEN: 'Токен авторизации не получен.',
  INVALID_USERDATA: 'Неверный логин или пароль.',
};

const MOVIE_MESSAGES = {
  NOT_FOUND: 'Ролик с указанным _id не найден.',
  INVALID_DATA: 'Переданы некорректные данные при создании ролика.',
  BAD_REQUEST: 'Переданы некорректные данные.',
  FORBIDDEN_DELETION: 'Недостаточно прав для удаления ролика.',
  SUCCESS_DELETION: 'Ролик успешно удалён.',
};

const SERVER_MESSAGES = {
  SERVER_ERROR: 'Ошибка на стороне сервера.',
  UNAUTHORIZED: 'Необходима авторизация.',
  URL_NOT_FOUND: 'Запрашиваемый адрес не найден.',
};

module.exports = {
  USER_MESSAGES,
  MOVIE_MESSAGES,
  SERVER_MESSAGES,
};
