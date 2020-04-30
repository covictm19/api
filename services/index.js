'use strict';

const jwt = require('./jwt');
const mail = require('./mail');

module.exports = dependencies => ({
  jwt: jwt({
    ...dependencies
  }),
  mailService: mail({
    ...dependencies,
  }),
});
