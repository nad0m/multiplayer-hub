const typeDefs = require('../gql/schema')
const resolvers = require('../gql/resolvers')
const FirebaseAuth = require('../gql/dataSources/firebaseAuth')
const messageApi = require('../gql/dataSources/messageApi')


const options = {
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      firebaseAuth: new FirebaseAuth(),
      messageApi
    }
  },
  context: ({ req }) => {
    return {
      userName: req.params.userName
    }
  }
}

module.exports = options