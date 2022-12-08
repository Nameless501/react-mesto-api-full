const {
  WRONG_LOGIN_CODE,
  WRONG_LOGIN_MESSAGE,
} = require('../utils/constants');

class DataAccessError extends Error {
  constructor(message = WRONG_LOGIN_MESSAGE) {
    super(message);
    this.name = 'DataAccessError';
    this.statusCode = WRONG_LOGIN_CODE;
  }
}

module.exports = DataAccessError;
