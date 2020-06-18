const firebase = require('firebase/app')

const { FIREBASE_CONFIG } = require('../config/constants')

/* --- Initialize Firebase instance --- */
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

module.exports = firebase