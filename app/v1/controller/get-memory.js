'use strict';

module.exports = ({ ObjectId, findMemory, responseHandler }) =>
  (req, res) => findMemory({
    memoryId: ObjectId(req.params.memoryId),
    ...responseHandler(req, res)
  });
