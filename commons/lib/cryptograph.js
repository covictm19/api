'use strict';

const cryptograph = ({ crypto, cryptoSalt }) => ({
  gen(password) {
    return new Promise((resolve, reject) => 
      crypto.pbkdf2(password, cryptoSalt, 4, 32, 'sha512', 
        (err, key) => err ? 
          reject(err) : 
          resolve(key.toString('hex'))));
  }
});

module.exports = cryptograph;
