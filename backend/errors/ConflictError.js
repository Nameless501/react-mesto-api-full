const {
  EMAIL_CONFLICT_CODE,
  EMAIL_CONFLICT_MESSAGE,
} = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = EMAIL_CONFLICT_MESSAGE) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = EMAIL_CONFLICT_CODE;
  }
}

module.exports = ConflictError;
