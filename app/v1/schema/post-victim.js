'use strict';

module.exports = Joi => Joi.object({
  name: Joi.string().required(),
  job: Joi.string().required(),
  age: Joi.number().required().min(1).max(199),
  deathDate: Joi.string().required(),
  description: Joi.string().required(),
  socialmidia: Joi.string().allow(''),
});
