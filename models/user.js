const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    requied: true,
  },
}, {
  versionKey: false, // убрал создание поля ключа версии записи в монго
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () { // переопределен метод чтобы удалить поле password
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
