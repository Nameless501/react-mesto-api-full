const {
  FORBIDDEN_CODE,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');

class ForbiddenError extends Error {
  constructor() {
    super();
    this.name = 'ForbiddenError';
    this.message = FORBIDDEN_MESSAGE;
    this.statusCode = FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
