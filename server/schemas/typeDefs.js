const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Example {
        _id: ID!
        name: String!
        createdAt: String
    }
`;

module.exports = typeDefs;