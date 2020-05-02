'use strict';

module.exports = ({ listMemories, responseHandler }) => 
  (req, res) => listMemories(responseHandler(req, res));
