import React from 'react'

import { Wrapper, Header, Form, Input, SubmitButton } from './LoginFormV2.styles'
import useAuth from '../../../hooks/useAuth'


const RegisterFormV2 = () => {
  const { register, isLoggedIn } = useAuth()
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
  } = register(onRegisterSuccess, onRegisterFailed, onError, false)

  console.log({isLoggedIn})
  if (isLoggedIn) {
    if (window) {
      //window.location.href = `/dashboard`
    }
  }

  function onRegisterSuccess() {
    console.log("Register successful!")
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