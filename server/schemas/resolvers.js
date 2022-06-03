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
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        try {
          const addBook = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: book } },
            { new: true });
          return addBook;
          } catch (err) {
          console.log(err);
        }
      };
      throw new AuthenticationError("You are not signed in!");
      const book = await Book.create(args);
      const token = signToken(user);
      return { token, book };
    removeBook: async (parent, bookId, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context._id);
          const deletedBook = await user.savedBooks.deleteById(bookId);
          return deletedBook;

        }
        catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError("You are not signed in!");
    }
  },
};

module.exports = resolvers;
