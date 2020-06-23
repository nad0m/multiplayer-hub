const gql = require("graphql-tag")

const schema = gql`
  type Message {
    content: String!
  }

  type Query {
    greeting: Message!
    currentUser: CurrentUser
  }

  type Mutation {
    registerNewUser(email: String!, password: String!): AuthOperationResult
    loginUser(email: String!, password: String!): AuthOperationResult
    logoutUser: AuthOperationResult
  }

  type AuthOperationResult {
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
module.exports = schema