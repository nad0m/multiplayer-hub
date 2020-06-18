import React, { useState } from 'react'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import InputField from '../../../components/InputField'
import { Wrapper, Form, SubmitButton, CheckLabel, RegisterLabel, GoogleButton, FacebookButton } from './LoginForm.styles'

const RegisterForm = ({ onRegisterSubmit, setIsLoginForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onFormSubmit = e => {
    e.preventDefault()
    if (email && password === passwordCheck) {
      onRegisterSubmit(email, password)
    } else {
      // form validation message here
    }
  }

  return (
    <Wrapper>
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