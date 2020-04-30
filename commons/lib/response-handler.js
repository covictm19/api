'use strict';

const responseHandler = logger => (request, response) => ({
  onError: (statusCode, err) => {
    logger.warn(`[${statusCode}] ${request.baseUrl}${request.path} - 
        ${err}`);
    const message = typeof err !== 'string' ? err.message : err;
    return response.status(statusCode).send({message});
  },
  onSuccess: (statusCode, message) => {
    logger.info(`[${statusCode}] ${request.path}`);
    return response.status(statusCode).send(message)
  },
});

module.exports = responseHandler;