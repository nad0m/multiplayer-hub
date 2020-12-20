const resolvers = {
  Query: {
    greeting: (parent, args, { dataSources, userName }) => {
      return dataSources.messageApi.getContent(userName)
    },
    currentUser: (parent, args, { dataSources }) => {
      return dataSources.firebaseAuth.getCurrentUser()
    },
    socketConfig: (parent, args) => {
      // we will use the game type, lobby hash and requesting user info
      // here to authenticate the request for a ws config and return the
      // hostname to the game server
      console.log('requested socket config', args)
      return {
        hostname: `http://${args.hostname}:8080`,
      }
    },
  },

  Mutation: {
    registerNewUser: async (parent, { email, password }, { dataSources }) => {
      const response = await dataSources.firebaseAuth.registerNewUser(
        email,
        password
      )
      return { success: !!response }
    },
    loginUser: async (parent, { email, password }, { dataSources = {} }) => {
      const response = await dataSources.firebaseAuth.loginUser(email, password)
      return { success: !!response }
    },
    logoutUser: async (parent, args, { dataSources }) => {
      const response = await dataSources.firebaseAuth.logoutUser()
      return { success: !!response }
    },
  },
}

module.exports = resolvers
