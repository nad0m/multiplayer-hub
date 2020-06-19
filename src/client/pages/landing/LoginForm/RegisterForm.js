import React, { useEffect } from 'react'
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
    email,
    password,
    passwordCheck,
    setEmail,
    setPassword,
    setPasswordCheck
  } = useRegisterUser(onRegisterSuccess, onRegisterFailed, onError, false)

  function onRegisterSuccess() {
    console.log("Register successful!")
    if (window) {
      window.location.href = `/greeting/${email}`
    }
  }

  function onRegisterFailed() {
    console.log("Register failed!")
  }

  function onError() {
    console.log("Register error!")
  }

  const onFormSubmit = e => {
    e.preventDefault()
    password === passwordCheck && invokeRegistration()
  }

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