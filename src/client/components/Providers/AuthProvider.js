import React, { createContext, useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import { LoadingPage } from '../Loaders'

export const AuthContext = createContext()

const AuthStateHandler = ({ unauthenticated, children }) => {
	const {
		initial,
		loading,
		success
	} = useContext(AuthContext)

	// used for unauthenticated pages, like login and landing
	if (unauthenticated) {
		if (loading || success) {
			return (
				<LoadingPage />
			)
		}
	} else {
		// used for authenticated pages
		if (initial || loading) {
			return (
				<LoadingPage />
			)
		}
	}

	return children
}

const AuthProvider = ({ unauthenticated, children }) => {
	const auth = useAuth()
	return (
		<AuthContext.Provider value={auth}>
			<AuthStateHandler unauthenticated={unauthenticated} >
				{children}
			</AuthStateHandler>
		</AuthContext.Provider>
	)
}

export default AuthProvider
