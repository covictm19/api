'use strict';

const DB = require('simple-connection');

module.exports = dependencies => {
  const { db: dbVar } = dependencies;
  return new DB(dbVar);
};
