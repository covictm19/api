'use strict';

const routes = dependencies => {
  const {
    controller,
    db,
    logger,
    repository,
    router,
    schema,
    services,
    useCases,
    validate,
  } = dependencies;

  const { post, get } = schema;

  const servicesInstance = services(dependencies);

  const {
    createLogin,
    createVictim,
    createUser,
    updateConfirmAccount,
    updatePassword,
  } = controller({
    ...dependencies,
    ...useCases({
      ...repository(db),
      ...servicesInstance,
      ...dependencies
    }),
  });

  logger.info('enable routes');

  router.post('/user', validate(post.user), createUser);
  router.post('/victim', validate(post.victim), createVictim);
  router.post('/login', validate(post.login), createLogin);
  router.post('/confirm-account', validate(get.accountConfirmation), updateConfirmAccount);
  router.post('/reset-password', validate(post.resetPassword), updatePassword);

  router.all('/', (req, res) => {
    console.log(`Work fine`);
    return res.status(200).send({ message: 'working' });
  });

  return router;
};

module.exports = routes;
