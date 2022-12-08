const router = require('express').Router();
const {
  getCurrentUser,
  getUsers,
  findUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
} = require('../utils/requestValidators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, findUser);
router.patch('/me', userDataValidation, updateProfile);
router.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = router;
