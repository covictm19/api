'use strict';

const createLogin = require('./create-login');
const createMemory = require('./create-memory');
const createUser = require('./create-user');
const listMemories = require('./get-memories');
const getMemory = require('./get-memory');
const updateConfirmAccount = require('./update-confirm-account');
const updatePassword = require('./update-password');

module.exports = dependencies => ({
  createLogin: createLogin(dependencies),
  createMemory: createMemory(dependencies),
  createUser: createUser(dependencies),
  listMemories: listMemories(dependencies),
  getMemory: getMemory(dependencies),
  updateConfirmAccount: updateConfirmAccount(dependencies),
  updatePassword: updatePassword(dependencies),
});
