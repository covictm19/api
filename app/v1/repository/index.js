const VictimRepository = require('./victim');
const UserRepository = require('./user');

module.exports = db => ({
  userRepository: UserRepository(db),
  victimRepository: VictimRepository(db),
});
