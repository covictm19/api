'use strict';

const fs = require('fs');
require('dotenv').config();
const packageName = require('../package.json').name;

const JWT_KEY = fs.readFileSync('./jwtRS256.key');
const JWT_KEY_PUB = fs.readFileSync('./jwtRS256.key.pub');

const {
  APP_PORT,
  AWS_KEY_ID,
  AWS_KEY_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USERS_COLLECTION,
  DB_MEMORIES_COLLECTION,
  LOG_PATH,
  CRYPTO_SALT,
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
} = process.env;

const config = {
  app: {
    name: packageName,
    port: APP_PORT,
    cryptoSalt: CRYPTO_SALT,
    jwtKey: JWT_KEY,
    jwtKeyPub: JWT_KEY_PUB,
    logPath: LOG_PATH,
  },
  aws: {
    awsKeyId: AWS_KEY_ID,
    awsAccessKey: AWS_KEY_ACCESS_KEY,
    bucketName: AWS_BUCKET_NAME,
    region: AWS_REGION,
  },
  db: {
    username: DB_USERNAME || '',
    password: DB_PASSWORD || '',
    server: DB_SERVER,
    port: DB_PORT,
    database_name: DB_NAME,
    usersCollection: DB_USERS_COLLECTION,
    memoriesCollection: DB_MEMORIES_COLLECTION
  },
  mail: {
    host: MAIL_SERVICE_HOST,
    port: MAIL_SERVICE_PORT,
    user: MAIL_SERVICE_USER,
    pass: MAIL_SERVICE_PASS,
  }
};

module.exports = Object.freeze(config);
