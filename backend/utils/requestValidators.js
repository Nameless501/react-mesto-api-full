const { celebrate, Joi } = require('celebrate');
const { LINK_REG_EXP } = require('./constants');

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .hex()
      .length(24)
      .required(),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    about: Joi.string()
      .min(2)
      .max(30)
      .required(),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(LINK_REG_EXP),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .pattern(LINK_REG_EXP),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .hex()
      .length(24)
      .required(),
  }),
});

const cardDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    link: Joi.string()
      .required()
      .pattern(LINK_REG_EXP),
  }),
});

module.exports = {
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
  signinValidation,
  signupValidation,
  cardIdValidation,
  cardDataValidation,
};
