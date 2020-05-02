'use strict';

const Memories = dependencies => {
  const {
    aws,
    logger,
    slugify,
    memoriesRepository,
  } = dependencies;

  const createMemory = async (request) => {
    const {
      memory,
      onSuccess,
      onError
    } = request;

    try {
      const date = new Date();
      const blob = memory.picture.replace(/^data:image\/jpeg;base64,/, '');

      memory.createdAt = date;
      memory.imageUrl = await aws.upload(`${slugify(memory.name)}-${+date}.jpg`, Buffer.from(blob, 'base64'));

      const { ops: [createdMemory] } = await memoriesRepository.insertOne(memory);

      return onSuccess(201, createdMemory);
    } catch (err) {
      logger.error(err);
      onError(503, err);
    }
  };

  const listMemories = async request => {
    const { onSuccess, onError } = request;
    try {
      const memories = await memoriesRepository.find({});
      return onSuccess(200, {
        memories,
      });
    } catch (err) {
      logger.error(err);
      onError(503, err);
    }
  }

  const findMemory = async request => {
    const {
      memoryId,
      onSuccess,
      onError,
    } = request;

    try {
      const [memory] = await memoriesRepository.find({ _id: memoryId });

      if (!memory) {
        return onError(404, { message: 'Memory not found' });
      }

      return onSuccess(200, memory);
    } catch (err) {
      logger.error(err);
      return onError(503, err);
    }
  }

  return {
    createMemory,
    listMemories,
    findMemory,
  };
};

module.exports = Memories;
