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
 * This hook combines all the auth-related hooks into a single context for any page to use
 */
const useAuthProvider = () => {
  const { data, refetch: refetchUser } = useQuery(CURRENT_USER_QUERY)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const user = data?.currentUser

  useEffect(() => {
    setIsLoggedIn(!!user)
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
    user,
    isLoggedIn,
    register,
    login,
    logout,
    refetchUser
  }
}

export default useAuthProvider