const { Error } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, next) => {
  if (err instanceof Error.CastError) {
    next(new BadRequestError());
  } else if (err instanceof Error.ValidationError) {
    next(new BadRequestError());
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    next(new ConflictError());
  } else {
    next(err);
  }
};

module.exports = { handleError, handleLog };
