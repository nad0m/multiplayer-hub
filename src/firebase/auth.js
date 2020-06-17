import firebase from './firebase'
import 'firebase/firebase-auth'

class Authentication {
  constructor() {
    this.auth = firebase.auth() || {}
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        // user is signed out
        this.user = null

        // TODO: handle sign out logic
      }
    })
  }
}