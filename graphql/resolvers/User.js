const resolvers = {
  User: {
    id(user) {
      return user._id;
    },
  },
  Query: {
    users(root, { lastCreatedAt, limit }, { User }) {
      return User.all({ lastCreatedAt, limit });
    },

    user(root, { id }, { User }) {
      return User.findOneById(id);
    },
    userByEmail: async (root, args, { User }) => {
      let user = await  User.collection.findOne({"email": args.email});
      console.log("user", user);
      return user;
    }
  },
  Mutation: {
    async createUser(root, { input }, { User }) {
      const id = await User.insert(input);
      return User.findOneById(id);
    },

    async updateUser(root, { id, input }, { User }) {
      await User.updateById(id, input);
      return User.findOneById(id);
    },

    removeUser(root, { id }, { User }) {
      return User.removeById(id);
    },
  },
  Subscription: {
    userCreated: user => user,
    userUpdated: user => user,
    userRemoved: id => id,
  },
};

export default resolvers;
