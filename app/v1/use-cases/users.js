'use strict';

const getFromBase64 = value => 
  Buffer.from(value, 'base64')
    .toString('utf8');

const Users = dependencies => {
  const {
    userRepository,
    cryptograph,
    jwt,
    mailService,
  } = dependencies;

  
  const createUser = async request => {
    const { user, onSuccess, onError } = request;

    try {
      const date = new Date();

      user.password = await cryptograph.gen(user.password);
      user.createdAt = date;
      user.updatedAt = date;
      user.confirmed = false;
      user.blocked = false;
      user.email = user.email.toLowerCase();

      {
        const { ops: [createdUser] } = await userRepository.insert(user);

        createdUser.password = null;
        await mailService.welcome(createdUser);

        createdUser.jwt = await jwt.sign(createdUser);

        return onSuccess(201, createdUser);
      }
    } catch(err) {
      onError(503, err);
    }
  };

  const confirmAccount = async request => {
    const { token:rawToken, onSuccess, onError } = request;

    try {
      {
        const token = getFromBase64(rawToken);
        const {_id} = await jwt.verify(token);

        const {result} = await userRepository.updateOne({
          _id
        }, {
          $set: {
            confirmed: true
          }
        });

        return onSuccess(200, result);
      }
    } catch(err) {
      onError(503, err);
    }
  };

  const login = async (request) => {
    const {
      onError,
      onSuccess,
      loginData: { identifier, password },
    } = request;

    try {
      const hashPass = await cryptograph.gen(password);
      const [user] = await userRepository.find({
        password: hashPass,
        email: identifier.toLowerCase(),
      });

      const token = await jwt.sign(user);

      return onSuccess(200, {
        jwt: token,
        user: user
      });
    } catch (err) {
      onError(401, {
        message: "Email e/ou senha incorretos."
      });
    }
  }

  return {
    createUser,
    confirmAccount,
    login,
  };
};

module.exports = Users;
