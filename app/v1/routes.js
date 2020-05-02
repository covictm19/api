'use strict';

const routes = dependencies => {
  const {
    authorize: Authorize,
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
  const authorize = Authorize(servicesInstance);

  const {
    createLogin,
    createMemory,
    createUser,
    listMemories,
    getMemory,
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
  router.post('/memory', authorize, validate(post.memory), createMemory);
  router.post('/login', validate(post.login), createLogin);
  router.post('/reset-password', validate(post.resetPassword), updatePassword);

  router.get('/memories', listMemories);
  router.get('/memory/:memoryId', getMemory);
  router.get('/confirm-account', validate(get.accountConfirmation), updateConfirmAccount);

  router.all('/', (req, res) => {
    console.log(`Work fine`);
    return res.status(200).send({ message: 'working' });
  });

  return router;
};

module.exports = routes;
