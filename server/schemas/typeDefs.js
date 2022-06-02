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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        removeBook(bookId: String): User
    }
`;

// Need to add the saveBook mutation using an input type to handle many parameters
// Look at how to do author / why that works
// Should the User have a password - is in example but not in doc, maybe we don't want to be able to query this? 
// Is bookID a string / check all scalars.

module.exports = typeDefs;