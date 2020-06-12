import typeDefs from '../gql/schema'
import resolvers from '../gql/resolvers'
import firebaseAuth from '../gql/datasources/firebaseAuth'
import messageApi from '../gql/dataSources/messageApi'


export default {
  typeDefs,
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