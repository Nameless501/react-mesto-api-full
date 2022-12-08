const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinValidation, signupValidation } = require('../utils/requestValidators');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
