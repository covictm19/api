'use strict';

module.exports = Joi => Joi.object({
  id: Joi.string().email(),
  token: Joi.string().required(),
});