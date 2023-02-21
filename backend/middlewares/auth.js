require('dotenv').config();
const jwt = require('jsonwebtoken');
const DataAccessError = require('../errors/DataAccessError');
const { NEED_AUTH_MESSAGE } = require('../utils/constants');
const { handleError } = require('../utils/utils');

const { JWT_KEY = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.body.jwt;
  let payload;

  if (!token) {
    handleError(new DataAccessError(NEED_AUTH_MESSAGE), next);
    return;
  }

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    handleError(new DataAccessError(NEED_AUTH_MESSAGE), next);
    return;
  }

  req.user = payload;
  next();
};
