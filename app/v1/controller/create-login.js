'use strict';

module.exports = dependencies => {
  const {
    createLogin,
    responseHandler,
  } = dependencies;

  return async (req, res) => {
    const { onSuccess, onError } = responseHandler(req, res);
    const loginData = { ...req.validData };
    return createLogin({ loginData, onSuccess, onError });
  };
};
