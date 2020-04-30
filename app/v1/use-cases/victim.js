'use strict';

const strengthItens = [
  'coverPicture',
  'description',
];

const Professionals = dependencies => {
  const {
    logger,
    victimRepository,
    mail: { alert }
  } = dependencies;

  const createVictim = async (request) => {
    const { victim, onSuccess, onError } = request;

    try {
      const date = new Date();
      victim.createdAt = date;
      const [createdVictim] = await victimRepository.find(user);

      return onSuccess(201, {
        createdVictim,
      });
    } catch (err) {
      onError(503, err);
    }
  };

  const findVictim = async request => {
    const {
      professionalId,
      onSuccess,
      onError,
      authorizationInfo: { id },
    } = request;

    try {
      const [professional] = await professionalRepository.find({ _id: professionalId });
      const [user] = await userRepository.find({ _id: professional.user });

      if (!user) {
        return onError(404, { message: 'User not found' });
      }

      if (id !== user._id.toHexString()) {
        logger.error('ATTENTION: ATTEMPT BREAK SECURITY');
        return onError(405, {
          message: 'not allowed'
        });
      }

      user.professional = professional;
      user.professional.categories = await categoriesRepository.find({});
      user.password = null;

      return onSuccess(200, user);
    } catch (err) {
      return onError(503, err);
    }
  }

  return {
    createVictim,
    findVictim,
  };
};

module.exports = Professionals;
