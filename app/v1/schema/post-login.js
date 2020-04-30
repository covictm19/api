'use strict';

module.exports = Joi => Joi.object({
  user: Joi.string().email(),
  password: Joi.string().required(),
});