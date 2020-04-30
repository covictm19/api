'use strict';

module.exports = schema => (req, res, next) => {
  const { body, params, query } = req;
  const [data] = [body, params, query].filter(Boolean)
    .filter(item => Boolean(Object.keys(item).length));

  const { error, value } = schema.validate(data);
  req.validData = value;
  return error ? (console.warn(error), res.status(400).send(error.name)) : next();
};
