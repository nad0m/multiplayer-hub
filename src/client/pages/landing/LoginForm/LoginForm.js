import React, { useState } from 'react'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import InputField from '../../../components/InputField'
import { Wrapper, Form, SubmitButton, CheckLabel, RegisterLabel, GoogleButton, FacebookButton } from './LoginForm.styles'

const LoginForm = ({ onLoginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = e => {
    e.preventDefault()
    onLoginSubmit(username, password)
  }

  return (
    <Wrapper>
      <UserSolidCircle size="100" strokeWidth="2" />
      <span>Login below to get started.</span>
      <Form onSubmit={onFormSubmit}>
        <InputField type="text" placeholder="E-mail Address" value={username} setValue={setUsername} />
        <InputField type="password" placeholder="Password" value={password} setValue={setPassword} />
        <CheckLabel>
          <input type="checkbox" />
          Keep me logged in
        </CheckLabel>
        <SubmitButton type="submit" value="Login" />
      </Form>
      <RegisterLabel>New user? <a href="/">Register</a> here.</RegisterLabel>
      <GoogleButton> <Google size="18" /> Sign in with Google</GoogleButton>
      <FacebookButton> <FacebookSquare size="18" /> Sign in with Facebook</FacebookButton>
    </Wrapper>
  )
}

export default LoginForm