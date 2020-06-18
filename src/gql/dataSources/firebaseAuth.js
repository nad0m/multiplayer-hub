const firebase = require('firebase')

const {
  FIREBASE_PROD_API_KEY,
  FIREBASE_APP_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_M_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} = (process.env || {})

// firebase config
const firebaseConfig = {
  apiKey: FIREBASE_PROD_API_KEY,
  authDomain: FIREBASE_APP_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_M_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig)

class FirebaseAuth {
  constructor() {
    this.auth = firebase.auth()
  }
  async createUser(email, password) {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      return res
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

module.exports = FirebaseAuth