import { useState, useEffect, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOG_OUT_USER = gql`
  mutation {
    logoutUser {
      success
    }
  }
`

const useLogout = (setIsLoggedIn = null, immediate) => {
  const [pending, setPending] = useState(false)
  const [logoutSuccess, setLogoutSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [logoutUser] = useMutation(LOG_OUT_USER)

  const invokeLogout = useCallback(() => {
    setPending(true)
    setLogoutSuccess(false)
    setError(null)
    return logoutUser()
      .then(response => {
        setLogoutSuccess(response?.data?.logoutUser?.success)
        typeof setIsLoggedIn === 'function' && setIsLoggedIn(false)
      })
      .catch(error => setError(error))
      .finally(() => setPending(false))
  }, [logoutUser])

  useEffect(() => {
    if (immediate) {
      invokeLogout()
    }
  }, [invokeLogout, immediate])

  return {
    invokeLogout,
    pending,
    logoutSuccess,
    error
  }
}

export default useLogout