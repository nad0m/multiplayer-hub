import { useState, useEffect, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const REGISTER_USER_MUTATION = gql`
  mutation RegisterNewUser($email: String!, $password: String!) {
    registerNewUser(email: $email, password: $password) {
      success
    }
  }
`
/**
 * 
 * @param {boolean} immediate set false if the register invocation is wrapped in a callback
 * @returns {object} 
 */
const useRegisterUser = (onRegisterSuccess, onRegisterFailed, onError, setIsLoggedIn, immediate = true) => {
  const [pending, setPending] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [registerNewUser] = useMutation(REGISTER_USER_MUTATION)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  // Queue the register function in useCallback
  const invokeRegistration = useCallback(() => {
    setPending(true)
    setRegisterSuccess(false)
    setError(null)
    return registerNewUser({ variables: { email, password } })
      .then(response => {
        setRegisterSuccess(response?.data?.registerNewUser?.success)
        typeof setIsLoggedIn === 'function' && setIsLoggedIn(true)
      })
      .catch(error => setError(error))
      .finally(() => setPending(false))
  }, [registerNewUser, email, password, passwordCheck])

  // Invoke register immediately if true
  useEffect(() => {
    if (immediate) {
      invokeRegistration()
    }
  }, [invokeRegistration, immediate])

  useEffect(() => {
    /* Handle register success */
    if (registerSuccess) {
      onRegisterSuccess()
    }

    /* Handle register failed */
    if (!pending && !registerSuccess) {
      onRegisterFailed()
    }

    // Handle error
    if (error) {
      onError()
    }
  }, [pending])

  return {
    invokeRegistration,
    pending,
    registerSuccess,
    error,
    email,
    password,
    passwordCheck,
    setEmail,
    setPassword,
    setPasswordCheck
  }
}

export default useRegisterUser