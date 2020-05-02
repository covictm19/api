'use strict';

module.exports = ({
  createMemory,
  ObjectId,
  responseHandler,
}) => (req, res) => createMemory({
  memory: {
    userId: ObjectId(req.authorizationInfo._id),
    ...req.validData
  }, 
  ...responseHandler(req, res)
});
