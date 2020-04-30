'use strict';

const VictimRepository = dependencies => {
  const { config: { victimsCollection } } = dependencies;
  const victims = dependencies.collection(victimsCollection);
  return {
    insertOne: document => victims('insertOne', document),
    find: async query => {
      const result = await victims('find', query);
      return result.toArray();
    }
  };
}

module.exports = VictimRepository;
