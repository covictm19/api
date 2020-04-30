'use strict';

const nodemailer = require('nodemailer');

const transportMail = dependencies => {
  const {
    mail: {
      host, port, user, pass 
    }
  } = dependencies;

  return nodemailer.createTransport({
    auth: { user, pass },
    secure: true,
    host,
    port,
  });
}

module.exports = transportMail;
