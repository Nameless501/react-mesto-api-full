const {
  NOT_FOUND_CODE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = NOT_FOUND_MESSAGE) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
