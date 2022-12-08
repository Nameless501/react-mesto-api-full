const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED_CODE } = require('../utils/constants');
const { handleError } = require('../utils/utils');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }, (err, newCard) => {
    if (err) {
      handleError(err, next);
      return;
    }
    Card.findById(newCard._id)
      .populate(['owner', 'likes'])
      .then((card) => res.status(CREATED_CODE).send({ data: card }))
      .catch((e) => handleError(e, next));
  });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove()
          .then(() => res.send({ data: card }));
      } else {
        throw new ForbiddenError();
      }
    })
    .catch((err) => handleError(err, next));
};

function handleLikeToggle(model, req, res, next, action) {
  return model.findByIdAndUpdate(
    req.params.cardId,
    { [action]: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, next));
}

const setCardLike = (req, res, next) => {
  handleLikeToggle(Card, req, res, next, '$addToSet');
};

const setCardDislike = (req, res, next) => {
  handleLikeToggle(Card, req, res, next, '$pull');
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  setCardDislike,
};
