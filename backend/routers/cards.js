const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  setCardDislike,
} = require('../controllers/cards');
const { cardIdValidation, cardDataValidation } = require('../utils/requestValidators');

router.get('/', getCards);
router.post('/', cardDataValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, setCardLike);
router.delete('/:cardId/likes', cardIdValidation, setCardDislike);

module.exports = router;
