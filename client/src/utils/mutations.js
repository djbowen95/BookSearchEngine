import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: ID
    $title: String
    $description: String
    $authors: [String]
    $image: String
  ) {
    saveBook(
      bookId: $bookId
      title: $title
      description: $description
      authors: $authors
      image: $image
    ) {
      _id
      username
      savedBooks {
        title
        authors
        description
        bookId
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;
