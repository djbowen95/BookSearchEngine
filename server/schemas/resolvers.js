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


};

module.exports = resolvers;
