export default {
  Query: {
    greeting: (parent, args, { dataSources, userName }) => {
      return dataSources.messageApi.getContent(userName)
    },
    currentUser: (parent, args, { dataSources }) => {
      return dataSources.firebaseAuth.getCurrentUser()
    }
  },

  Mutation: {
    registerNewUser: (parent, { email, password }, { dataSources }) => {
      return dataSources.firebaseAuth.registerNewUser(email, password)
    },
    loginUser: (parent, { email, password }, { dataSources }) => {
      return dataSources.firebaseAuth.loginUser(email, password) 
    },
  }
}
