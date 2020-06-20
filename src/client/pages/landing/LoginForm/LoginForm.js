import React from 'react'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import InputField from '../../../components/InputField'
import { Wrapper, Form, SubmitButton, CheckLabel, RegisterLabel, GoogleButton, FacebookButton } from './LoginForm.styles'
import useLogin from '../../../hooks/useLogin'

const LoginForm = ({ setIsLoginForm }) => {
  const {
    invokeLogin,
    loginSuccess,
    pending,
    email,
    password,
    setEmail,
    setPassword
  } = useLogin(onLoginSuccess, onLoginFailed, onError, false)

  function onLoginSuccess() {
    console.log("Login successful!")
    if (window) {
      window.location.href = `/greeting/${email}`
    }
  }

  function onLoginFailed() {
    console.log("Login failed!")
  }

  function onError() {
    console.log("Login error!")
  }

  const onFormSubmit = e => {
    e.preventDefault()
    invokeLogin()
  }

  return (
    <Wrapper disabled={pending || loginSuccess}>
      <UserSolidCircle size="100" strokeWidth="2" />
      <span>Login below to get started.</span>
      <Form onSubmit={onFormSubmit}>
        <InputField type="text" placeholder="E-mail Address" value={email} setValue={setEmail} />
        <InputField type="password" placeholder="Password" value={password} setValue={setPassword} />
        <CheckLabel>
          <input type="checkbox" />
          Keep me logged in
        </CheckLabel>
        <SubmitButton type="submit" value="Login" />
      </Form>
      <RegisterLabel>New user? <a onClick={e => setIsLoginForm(false)}>Register</a> here.</RegisterLabel>
      <GoogleButton> <Google size="18" /> Sign in with Google</GoogleButton>
      <FacebookButton> <FacebookSquare size="18" /> Sign in with Facebook</FacebookButton>
    </Wrapper>
  )
}

export default LoginForm