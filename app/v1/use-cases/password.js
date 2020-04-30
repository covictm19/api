'use strict';

const Password = dependencies => {
  const {
    jwt,
    userRepository,
    cryptograph,
  } = dependencies;

  const createPassword = async (request) => {
    const { 
      onError,
      onSuccess, 
      passwordData: {password, code}, 
    } = request;

    try {
      const query = { resetPasswordToken: code };

      const hashPass = await cryptograph.gen(password);
      const [user] = await userRepository.find(query);
      
      if (!user) {
        return onError(400, 'Invalid code');
      }

      const update = userRepository.updateOne(query,
        {
          $set: {
            password: hashPass,
            resetPasswordToken: null
          }
        });

      user.password = null;
      user.resetPasswordToken = null;
      
      const [token] = await Promise.all([
        jwt.sign(user),
        update,
      ]);

      return onSuccess(200, {
        jwt: token,
        user: user
      });
    } catch (err) {
      onError(503, err);
    }
  }

  return {
    createPassword,
  }
}

module.exports = Password;
