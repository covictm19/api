'use strict';

module.exports = ({
  confirmaAccount,
  responseHandler,
}) => async (req, res) => confirmaAccount({
  accountData: req.validData, 
  ...responseHandler(req, res)
});
