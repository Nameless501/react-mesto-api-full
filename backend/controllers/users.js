const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED_CODE } = require('../utils/constants');
const { handleError } = require('../utils/utils');

const { SECRET_KEY = 'some-secret-key' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true }).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => handleError(err, next));
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, next));
};

function findUserById(model, id, res, next) {
  return model.findById(id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, next));
}

const getCurrentUser = (req, res, next) => {
  findUserById(User, req.user._id, res, next);
};

const findUser = (req, res, next) => {
  findUserById(User, req.params.userId, res, next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => handleError(err, next));
};

function updateUserData(model, id, res, next, params) {
  return model.findByIdAndUpdate(id, params, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, next));
}

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(User, req.user._id, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(User, req.user._id, res, next, { avatar });
};

module.exports = {
  login,
  getUsers,
  findUser,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
