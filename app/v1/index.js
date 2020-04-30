'use strict';

const router = require('express').Router();

const services = require('../../services');

const startRoutes = require('./routes');

const schema = require('./schema');
const controller = require('./controller');
const repository = require('./repository');
const useCases = require('./use-cases');

module.exports = dependencies => ({
  routerV1: startRoutes({
    ...dependencies,
    controller,
    router,
    repository,
    schema,
    services,
    useCases,
  }),
});
