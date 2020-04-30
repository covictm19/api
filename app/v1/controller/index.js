'use strict';

const createLogin = require('./create-login');
const createVictim = require('./create-victim');
const createUser = require('./create-user');
const updateConfirmAccount = require('./update-confirm-account');
const updatePassword = require('./update-password');

module.exports = dependencies => ({
  createLogin: createLogin(dependencies),
  createVictim: createVictim(dependencies),
  createUser: createUser(dependencies),
  updateConfirmAccount: updateConfirmAccount(dependencies),
  updatePassword: updatePassword(dependencies),
});
