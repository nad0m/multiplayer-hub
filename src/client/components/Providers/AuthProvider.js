import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import useAuth from '../../hooks/useAuth'
import { LoadingPage } from '../Loaders'
import GlobalStyle from '../Utility/GlobalStyle'

export const AuthContext = createContext()

const AuthStateHandler = ({ noAuth, children }) => {
  const { initial, loading, success } = useContext(AuthContext)
  // used for unauthed pages, like login and landing
  if (noAuth && (loading || success)) {
    return <LoadingPage />
  }
  // used for authenticated pages
  if (!noAuth && (initial || loading)) {
    return <LoadingPage />
  }
  return children
}

const AuthProvider = ({ noAuth, children }) => {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      <GlobalStyle />
      <AuthStateHandler noAuth={noAuth}>{children}</AuthStateHandler>
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  noAuth: PropTypes.bool,
  children: PropTypes.element,
}

export default AuthProvider
