import typeDefs from '../../gql/schema'
import resolvers from '../../gql/resolvers'
import messageApi from '../../gql/dataSources/messageApi'


export default {
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      messageApi
    }
  },
  context: ({ req }) => {
    return {
      userName: req.params.userName
    }
  }
}