'use strict';

module.exports = Joi => Joi.object({
  code: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string(),
});
