const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]!
    }
    
    type Book {
        bookId: String
        authors: [Author]
        description: String
        title: String
        image: String
        link: String
    }

    type Author {
        name: String
    }

`;

module.exports = typeDefs;