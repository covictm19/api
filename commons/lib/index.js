'use strict';

const authorize = require('./authorize');
const cors = require('./cors');
const cryptograph = require('./cryptograph');
const db = require('./db');
const logger = require('./logger');
const responseHandler =require('./response-handler');
const transportMail = require('./transport-mail');
const validate = require('./validate');

module.exports = {
  authorize,
  cors,
  cryptograph,
  db,
  logger,
  responseHandler,
  transportMail,
  validate,
};
