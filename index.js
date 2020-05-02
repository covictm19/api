'use strict';

const http = require('http');

const awsSDK = require('aws-sdk');
const chalk = require('chalk');
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const mjml2html = require('mjml');
const nodemailer = require("nodemailer");
const path = require('path');
const responseTime = require('response-time');
const slugify = require('slugify');
const JWT = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId;

const App = require('./app.js');
const routers = require('./app/v1');

const { env } = require('./config');
const {
  authorize,
  cors,
  db,
  logger,
  responseHandler,
  transportMail,
  validate,
  cryptograph,
} = require('./commons/lib');

const apprun = express();

apprun.use(express.json({ limit: '5mb' }));

apprun.use(responseTime());
apprun.use(cors);

const { routerV1 } = routers({
  app: env.app,
  config: env,
  mail: env.mail,
  db: db(env),
  responseHandler: responseHandler(logger),
  cryptograph: cryptograph({
    cryptoSalt: env.app.cryptoSalt,
    crypto,
  }),
  transportMail: transportMail(env),
  authorize,
  awsSDK,
  fs,
  handlebars,
  JWT,
  mjml2html,
  nodemailer,
  logger,
  ObjectId,
  path,
  slugify,
  validate,
});

apprun.use('/v1', routerV1);

const app = App({
  chalk,
  apprun,
  logger,
  responseTime,
});

const { port } = env.app;

const server = http.createServer(app);
server.listen(port);

server.on('error', error => logger.error(chalk.red(error.message)));
process.on('error', logger.error);

logger.info(chalk.green(`App running at port ${port}`));
logger.info(`Node Version - ${process.version}`);
