import React from 'react'
import styled from 'styled-components'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'

import InputField from '../../components/input/InputField'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  color: #c0c8d1;
  > span {
    margin: 20px 0;
    font-weight: bold;
  }
`

const Form = styled.form`
  > div {
    margin: 20px 0;
  }
`

const CheckLabel = styled.label`
  font-size: 13px;
  display: flex;
  align-items: center;
  > input {
   margin: 0 5px 0 25px;
  }
`


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
        <input type="submit" value="Login"/> 
      </Form>
    </Wrapper>
  )
}

export default LoginForm