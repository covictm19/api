'use strict';

const Password = require('./password'); 
const Memories = require('./memory');
const Users = require('./users');

module.exports = dependencies => ({
  ...Password({
    ...dependencies,
  }),
  ...Memories({
    ...dependencies
  }),
  ...Users({
    ...dependencies,
  }),
});
