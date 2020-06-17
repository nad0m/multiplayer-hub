import { auth } from '../../firebase'

const firebaseAuth = {
  registerNewUser: async (email, password) => {
    const success = true
    await auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      success = false
      console.log(error)
    })
    return { success }
  },
  loginUser: async (email, password) => {
    const success = await auth.signInWithEmailAndPassword(email, password)
    .then(( ...args ) => {
      console.log('Login success')
      return true
    })
    .catch((error) => {
      console.log(error)
      return false
    })

    console.log({ success })

    return { success }
  },
  getCurrentUser: () => {
    return auth.currentUser
  }
}

export default firebaseAuth