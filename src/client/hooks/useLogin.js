import { useState, useEffect, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
    }
  }
`
/**
 * 
 * @param {boolean} immediate set false if the login invocation is wrapped in a callback
 * @returns {object} 
 */
const useLogin = (onLoginSuccess, onLoginFailed, onError, setIsLoggedIn, immediate) => {
  const [pending, setPending] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loginUser] = useMutation(LOGIN_USER_MUTATION)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Queue the login function in useCallback
  const invokeLogin = useCallback(() => {
    setPending(true)
    setLoginSuccess(false)
    setError(null)
    return loginUser({ variables: { email, password } })
      .then(response => {
        setLoginSuccess(response?.data?.loginUser?.success)
        typeof setIsLoggedIn === 'function' && setIsLoggedIn(true)
      })
      .catch(error => setError(error))
      .finally(() => setPending(false))
  }, [loginUser, email, password])

  // Invoke login immediately if true
  useEffect(() => {
    if (immediate) {
      invokeLogin()
    }
  }, [invokeLogin, immediate])

  
  useEffect(() => {
    /* Handle login success */
    if (loginSuccess) {
      onLoginSuccess()
    }

    /* Handle login failed */
    if (!pending && !loginSuccess) {
      onLoginFailed()
    }

    // Handle error
    if (error) {
      onError()
    }
  }, [pending])

  return { 
    invokeLogin, 
    pending, 
    loginSuccess, 
    email, 
    password, 
    setEmail, 
    setPassword 
  } 
}

export default useLogin