import { firebase, auth } from '../firebase'


const firebaseAuth = {
	auth,
	/**
	 * We can provide an `onAuthStateChanged` callback here to subscribe to changes
	 * in the auth state (mostly used for session persistence). This is called on
	 * mount or as soon at the auth instance is configured.
	 * @param {Object} [onStateChange]
	 */
	configure: onStateChange => {
		auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		if (onStateChange) {
			auth.onAuthStateChanged(onStateChange)
		}
	},
	registerNewUser: async (email, password) => {
		try {
			const res = await auth.createUserWithEmailAndPassword(email, password)
			return { success: true, ...res }
		} catch (error) {
			console.error(error)
			return { success: false, error }
		}
	},
	loginUser: async (email, password) => {
		try {
			const res = await auth.signInWithEmailAndPassword(email, password)
			return { success: true, ...res }
		} catch (error) {
			console.error(error)
			return { success: false, error }
		}
	},
	getCurrentUser: () => {
		const user = auth.currentUser
		if (user) {
			return { user, success: true }
		}
		return { success: false, error: 'Failed to restore session.' }
	},
	logoutUser: async () => {
		try {
			const res = await auth.signOut()
			return { success: true, ...res }
		} catch (error) {
			console.error(error)
			return { success: false, error }
		}
	}
}

export default firebaseAuth
