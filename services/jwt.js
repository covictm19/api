'use strict';

const jwt = ({ JWT, app: { jwtKey, jwtKeyPub }}) => ({
  sign: info => 
    new Promise((resolve, reject) => 
      JWT.sign({
        ...info,
        expiresIn: '30 days'
      }, jwtKey, { algorithm: 'RS256' },
        (err, token) => 
          err ? reject(err) : resolve(token))),
  verify: token => 
    new Promise((resolve, reject) => 
      JWT.verify(token, jwtKeyPub, { algorithm: ['RS256'] },
        (err, token) => 
          err ? reject(err) : resolve(token)))
});

module.exports = jwt;