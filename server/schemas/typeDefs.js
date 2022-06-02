const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        password: String
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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth

    }
`;

module.exports = typeDefs;