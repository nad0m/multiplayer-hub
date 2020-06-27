const typeDefs = require('../gql/schema')
const resolvers = require('../gql/resolvers')
const firebaseAuth = require('../gql/dataSources/firebaseAuth')
const messageApi = require('../gql/dataSources/messageApi')


const options = {
  typeDefs,
  schemaDirectives: {},
  resolvers,
  dataSources: () => {
		return {
			firebaseAuth,
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
