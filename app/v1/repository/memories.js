'use strict';

const MemoriesRepository = dependencies => {
  const { config: { memoriesCollection } } = dependencies;
  const memories = dependencies.collection(memoriesCollection);
  return {
    insertOne: document => memories('insertOne', document),
    find: async query => {
      const result = await memories('find', query);
      return result.toArray();
    }
  };
}

module.exports = MemoriesRepository;
