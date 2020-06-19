import React, { useState, useEffect } from 'react'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import InputField from '../../../components/InputField'
import { Wrapper, Form, SubmitButton, RegisterLabel, GoogleButton, FacebookButton } from './LoginForm.styles'
import useRegisterUser from '../../../hooks/useRegisterUser'

const RegisterForm = ({ setIsLoginForm }) => {
  const {
    invokeRegistration,
    registerSuccess,
    pending,
    error,
    email,
    password,
    passwordCheck,
    setEmail,
    setPassword,
    setPasswordCheck
  } = useRegisterUser(false)

  const onFormSubmit = e => {
    e.preventDefault()
    password === passwordCheck && invokeRegistration()
  }

  useEffect(() => {
    /* Handle register success */
    if (registerSuccess) {
      console.log("Register successful!")
      if (window) {
        window.location.href = `/greeting/${email}`
      }
    }

    /* Handle register failed */
    if (!pending && !registerSuccess) {
      console.log("Register failed")
    }

    // Handle error
    if (error) {
      console.log({error})
    }
  }, [pending])

  return (
    <Wrapper disabled={pending || registerSuccess}>
      <UserSolidCircle size="100" strokeWidth="2" />
      <span>Register below to get started.</span>
      <Form onSubmit={onFormSubmit}>
        <InputField type="text" placeholder="Enter E-mail address" value={email} setValue={setEmail} />
        <InputField type="password" placeholder="Enter password (8 - 16)" value={password} setValue={setPassword} />
        <InputField type="password" placeholder="Verify password" value={passwordCheck} setValue={setPasswordCheck} />
        <SubmitButton type="submit" value="Register" />
      </Form>
      <RegisterLabel>Existing user? <a onClick={e => setIsLoginForm(true)}>Login</a> here.</RegisterLabel>
      <GoogleButton> <Google size="18" /> Sign in with Google</GoogleButton>
      <FacebookButton> <FacebookSquare size="18" /> Sign in with Facebook</FacebookButton>
    </Wrapper>
  )
}

export default RegisterForm