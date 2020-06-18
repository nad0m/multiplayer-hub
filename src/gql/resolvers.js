const resolvers = {
  Query: {
    greeting: (parent, args, { dataSources, userName }) => {
      return dataSources.messageApi.getContent(userName)
    },
    currentUser: (parent, args, { dataSources }) => {
      return dataSources.firebaseAuth.getCurrentUser()
    }
  },

  Mutation: {
    registerNewUser: async (parent, { email, password }, { dataSources }) => {
      const response = await dataSources.firebaseAuth.registerNewUser(email, password)
      return { success: !!response }
    },
    loginUser: async (parent, { email, password }, { dataSources }) => {
      const response = await dataSources.firebaseAuth.loginUser(email, password) 
      return { success: !!response }
    },
  }
}

module.exports = resolvers

