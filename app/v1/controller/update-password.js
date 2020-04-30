'use strict';

module.exports = dependencies => {
  const {
    createPassword,
    responseHandler,
  } = dependencies;

  return async (req, res) => {
    const { onSuccess, onError } = responseHandler(req, res);
    const passwordData = { ...req.validData };
    return createPassword({ passwordData, onSuccess, onError });
  };
};
