import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import useAuth from '../../hooks/useAuth'
import { LoadingPage } from '../Loaders'
import GlobalStyle from '../Utility/GlobalStyle'

export const AuthContext = createContext()

const AuthStateHandler = ({ unauthenticated, children }) => {
  const { initial, loading, success } = useContext(AuthContext)

  // used for unauthenticated pages, like login and landing
  if (unauthenticated && (loading || success)) {
    return <LoadingPage />
  }

  // used for authenticated pages
  if (!unauthenticated && (initial || loading)) {
    return <LoadingPage />
  }

  return children
}

const AuthProvider = ({ unauthenticated, children }) => {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      <GlobalStyle />
      <AuthStateHandler unauthenticated={unauthenticated}>
        {children}
      </AuthStateHandler>
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  unauthenticated: PropTypes.bool,
  children: PropTypes.element,
}

export default AuthProvider
