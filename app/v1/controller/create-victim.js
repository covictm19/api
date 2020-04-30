'use strict';

module.exports = dependencies => {
  const {
    createProfessional,
    responseHandler,
  } = dependencies;

  return async (req, res) => {
    const { onSuccess, onError } = responseHandler(req, res);
    const professional = { ...req.validData };
    return createProfessional({ professional, onSuccess, onError });
  };
};
