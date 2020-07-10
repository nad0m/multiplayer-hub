import _firebase from 'firebase/app'
import 'firebase/auth'
import { FIREBASE_CONFIG } from '../../config/constants'


/* --- Initialize Firebase instance --- */
if (typeof window !== 'undefined' && !_firebase.apps.length) {
  _firebase.initializeApp(FIREBASE_CONFIG)
}

// here we can export all the firebase module instances
export const firebase = _firebase
export const auth = firebase.auth()
