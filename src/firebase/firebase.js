import firebase from 'firebase/app'

import { FIREBASE_CONFIG } from '../config/constants'

/* --- Initialize Firebase instance --- */
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export default firebase