'use strict';

module.exports = ({
  confirmAccount,
  responseHandler,
}) => async (req, res) => confirmAccount({
  ...req.validData, 
  ...responseHandler(req, res)
});
