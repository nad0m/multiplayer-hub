import React from 'react'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import { Wrapper, Header, OAuthGroup, OAuthButton, OrLabel, Form, Input, SubmitButton } from './LoginFormV2.styles'
import useRegisterUser from '../../../hooks/useRegisterUser'


const RegisterFormV2 = () => {
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
    <Wrapper>
      <Header>Register below</Header>
      <Form onSubmit={onFormSubmit}>
        <label>Email</label>
        <Input type="email" placeholder="Enter email address" required value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <Input type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)}/>
        <label>Password verify</label>
        <Input type="password" placeholder="Verify your password" required value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)}/>
        <SubmitButton type="submit" value="Sign Up" />
      </Form>
    </Wrapper>
  )
}

export default RegisterFormV2