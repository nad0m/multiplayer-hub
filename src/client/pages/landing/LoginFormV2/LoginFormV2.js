import React from 'react'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import { Wrapper, Header, OAuthGroup, OAuthButton, OrLabel, Form, Input, SubmitButton } from './LoginFormV2.styles'
import useLogin from '../../../hooks/useLogin'


const LoginFormV2 = () => {
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
    <Wrapper>
      <Header>Log in with</Header>
      <OAuthGroup>
        <OAuthButton><Google size="28" />Google</OAuthButton>
        <OAuthButton><FacebookSquare size="28" />Facebook</OAuthButton>
      </OAuthGroup>
      <OrLabel>or</OrLabel>
      <Form onSubmit={onFormSubmit}>
        <label>Email</label>
        <Input type="text" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <Input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
        <SubmitButton type="submit" value="Log In" />
      </Form>
    </Wrapper>
  )
}

export default LoginFormV2