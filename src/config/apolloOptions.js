const typeDefs = require('../gql/schema')
const resolvers = require('../gql/resolvers')
const auth = require('../gql/dataSources/firebaseAuth')
const messageApi = require('../gql/dataSources/messageApi')


const options = {
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      firebaseAuth: auth,
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