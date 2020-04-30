'use strict';

module.exports = dependencies => {
  const {
    createUser,
    responseHandler,
  } = dependencies;

  return async (req, res) => {
    const { onSuccess, onError } = responseHandler(req, res);
    const user = { ...req.validData };
    return createUser({ user, onSuccess, onError });
  };
};
