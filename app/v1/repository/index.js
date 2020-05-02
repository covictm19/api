const MemoriesRepository = require('./memories');
const UserRepository = require('./user');

module.exports = db => ({
  userRepository: UserRepository(db),
  memoriesRepository: MemoriesRepository(db),
});
