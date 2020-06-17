import React from 'react'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'
import { Google, Facebook } from '@styled-icons/boxicons-logos'

import InputField from '../../../components/InputField'
import { Wrapper, Form, SubmitButton, CheckLabel, RegisterLabel, GoogleButton, FacebookButton } from './LoginForm.styles'

const LoginForm = () => {
  return (
    <Wrapper>
      <UserSolidCircle size="100" strokeWidth="2" />
      <span>Login below to get started.</span>
      <Form>
        <InputField type="text" placeholder="E-mail Address" />
        <InputField type="password" placeholder="Password" />
        <CheckLabel>
          <input type="checkbox" />
          Keep me logged in
        </CheckLabel>
        <SubmitButton type="submit" value="Login" />
      </Form>
      <RegisterLabel>New user? <a href="/">Register</a> here.</RegisterLabel>
      <GoogleButton> <Google size="18" /> Sign in with Google</GoogleButton>
      <FacebookButton> <Facebook size="18" /> Sign in with Facebook</FacebookButton>
    </Wrapper>
  )
}

export default LoginForm