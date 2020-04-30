const UserRepository = dependencies => {
  const { config: { usersCollection } } = dependencies;
  const users = dependencies.collection(usersCollection);

  return {
    find: async query => {
      const result = await users('find', query);
      return result.toArray();
    },
    insert: user => users('insertOne', user),
    updateOne: (query, info) => users('updateOne', query, info),
  }
}

module.exports = UserRepository;