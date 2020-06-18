const auth = require('../../firebase');

const firebaseAuth = {
  registerNewUser: async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      return { success: res }
    } catch (err) {
      console.log(err)
      return { success: res }
    }
  },
  loginUser: async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      return { success: res }
    } catch (err) {
      console.log(err)
      return { success: res }
    }
  },
  getCurrentUser: () => {
    return auth.currentUser
  }
}

module.exports = firebaseAuth