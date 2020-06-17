import gql from 'graphql-tag'

export default gql`
  type Message {
    content: String!
  }

  type Query {
    greeting: Message!
    currentUser: CurrentUser
  }

  type Mutation {
    registerNewUser(email: String!, password: String!): LoginUserResult
    loginUser(email: String!, password: String!): LoginUserResult
  }

  type LoginUserResult {
    success: Boolean!
  }

  type UserMetaData {
    creationTime: String
    lastSignInTime: String
  }

  type CurrentUser {
    displayName: String
    email: String
    emailVerified: Boolean!
    isAnonymous: Boolean!
    metadata: UserMetaData
    phoneNumber: String
    photoURL: String
    providerId: String!
    refreshToken: String!
    tenantId: String
    uid: String!
  }
`
