'use strict';

module.exports = Joi => (
  Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
    name: Joi.string().required(''),
  })
);
