import React from 'react'
import styled from 'styled-components'

import InputField from '../../components/input/InputField'

const Form = styled.form`
  > div {
    margin: 20px 0;
  }
`

const LoginForm = () => {

  return (
    <Form>
      <InputField type="text" placeholder="E-Mail Address" />
      <InputField type="password" placeholder="Password" />
    </Form>
  )
}

export default LoginForm