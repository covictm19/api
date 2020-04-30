'use strict';

const Password = require('./password'); 
const Victims = require('./victim');
const Users = require('./users');

module.exports = dependencies => ({
  ...Password({
    ...dependencies,
  }),
  ...Victims({
    ...dependencies
  }),
  ...Users({
    ...dependencies,
  }),
});
