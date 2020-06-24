import React from 'react'

import { Wrapper, Header, Form, Input, SubmitButton } from './LoginFormV2.styles'
import useAuthContext from '../../../hooks/useAuthContext'


const RegisterFormV2 = () => {
  const { register, isLoggedIn } = useAuthContext()
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
  } = register()

  if (isLoggedIn) {
    if (window) {
      window.location.href = `/dashboard`
    }
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