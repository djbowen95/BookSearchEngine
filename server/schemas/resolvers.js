const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const currentUser = await User.findOne({ _id: context.user._id });
        return currentUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log(email, password, "From resolvers");
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email or password incorrect.");
      }
      const validatePW = await user.isCorrectPassword(password);
      if (!validatePW) {
        throw new AuthenticationError("Email or password incorrect.");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
