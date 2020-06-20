import React from 'react'
import { Google, FacebookSquare } from '@styled-icons/boxicons-logos'

import { Wrapper, Header, OAuthGroup, OAuthButton, OrLabel, Form, Input, SubmitButton } from './LoginFormV2.styles'


const LoginFormV2 = () => {

  return (
    <Wrapper>
      <Header>Log in with</Header>
      <OAuthGroup>
        <OAuthButton><Google size="20" />Google</OAuthButton>
        <OAuthButton><FacebookSquare size="20" />Facebook</OAuthButton>
      </OAuthGroup>
      <OrLabel>or</OrLabel>
      <Form>
        <label>Name</label>
        <Input type="text" placeholder="Enter email address" />
        <label>Password</label>
        <Input type="password" placeholder="Enter your password" />
        <SubmitButton type="submit" value="Log In" />
      </Form>

    </Wrapper>
  )
}

export default LoginFormV2