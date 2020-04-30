'use strict';

module.exports = (dependencies) => {
  const { chalk, apprun, logger } = dependencies;

  apprun.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = `not path request path ${JSON.stringify(req.path)}`;
    logger.info(`[${err.status}] ${req.path}`);
    return next(err);
  });

  apprun.use((err, req, res, next) => {
    console.error(chalk.red(err.stack));
    logger.error(`[${err.status}] ${req.path}`);
    return res.status(err.status || 500).send(err.message);
  });

  return apprun;
}
