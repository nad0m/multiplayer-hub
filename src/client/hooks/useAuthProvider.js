import { useState, useEffect } from 'react'
import useLogin from './useLogin'
import useRegisterUser from './useRegisterUser'
import useLogout from './useLogout'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      displayName
      email
      emailVerified
      isAnonymous
      metadata {
        creationTime
        lastSignInTime
      }
      phoneNumber
      photoURL
      providerId
      refreshToken
      tenantId
      uid
    }
  }
`

/**
 * Hook that combines all the auth-related hooks into a context for any page to use
 */
const useAuthProvider = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    setIsLoggedIn(!!data?.currentUser)
  }, [data])

  const register = (onRegisterSuccess, onRegisterFailed, onError, immediate) => {
    return useRegisterUser(onRegisterSuccess, onRegisterFailed, onError, setIsLoggedIn, immediate)
  }

  const login = (onLoginSuccess, onLoginFailed, onError, immediate) => {
    return useLogin(onLoginSuccess, onLoginFailed, onError, setIsLoggedIn, immediate)
  }

  const logout = (immediate) => {
    return useLogout(setIsLoggedIn, immediate)
  }

  return {
    isLoggedIn,
    register,
    login,
    logout
  }
}

export default useAuthProvider