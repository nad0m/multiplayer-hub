import React from 'react'
import { Google, Facebook } from '@styled-icons/boxicons-logos'

import { Wrapper, Header, OAuthGroup, OAuthButton, OrLabel, Form, Input, SubmitButton } from './LoginFormV2.styles'
import useLogin from '../../../hooks/useLogin'


const LoginFormV2 = ({ isLoginForm }) => {
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
    <Wrapper isLoginForm={isLoginForm}>
      <Header>Log in with</Header>
      <OAuthGroup>
        <OAuthButton><Google size="28" color="#f14236" />Google</OAuthButton>
        <OAuthButton><Facebook size="28" color="#4267b2" />Facebook</OAuthButton>
      </OAuthGroup>
      <OrLabel>or</OrLabel>
      <Form onSubmit={onFormSubmit}>
        <label>Email</label>
        <Input type="email" placeholder="Enter email address" required value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <Input type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)}/>
        <SubmitButton type="submit" value="Log In" />
      </Form>
    </Wrapper>
  )
}

export default LoginFormV2