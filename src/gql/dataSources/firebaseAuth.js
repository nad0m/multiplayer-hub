const { auth } = require('../../firebase')

const firebaseAuth = {
  registerNewUser: async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log({ email, password, res })
      return res
    } catch (err) {
      console.log(err)
      return null
    }
  },
  loginUser: async (email, password) => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      console.log({ email, password, res })
      return res
    } catch (err) {
      console.log(err)
      return null
    }
  },
  getCurrentUser: () => {
    return auth.currentUser
  },
  logoutUser: async () => {
    try {
      const res = await auth.signOut()
      return res
    } catch (err) {
      console.log(err)
      return null
    }
  },
}

module.exports = firebaseAuth
