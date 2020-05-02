'use strict';

const aws = require('./aws');
const jwt = require('./jwt');
const mail = require('./mail');

module.exports = dependencies => ({
  aws: aws(dependencies),
  jwt: jwt(dependencies),
  mailService: mail(dependencies),
});
