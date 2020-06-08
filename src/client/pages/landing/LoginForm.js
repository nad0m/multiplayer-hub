import React from 'react'
import styled from 'styled-components'
import { UserSolidCircle } from '@styled-icons/zondicons/UserSolidCircle'

import InputField from '../../components/input/InputField'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
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

  > label {
    margin: 0 0 40px;
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

const SubmitButton = styled.input`
  padding: 12px 25px;
  color: #fff;
  font-weight: bold;
  border: 3px solid #fafafa;
  border-radius: 20px;
  width: 100%;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to top right, #00802b , #00ff55);
  -webkit-box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);
  -moz-box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);
  box-shadow: 0px 10px 14px -5px rgba(72,176,107,1);

  &:hover {
    filter: grayscale(20%)
  }

  &:active {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    box-shadow: 0px 0px 5px 0px rgba(72,176,107,1);
    transform: translateY(1px);
    filter: grayscale(0%)
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
          <SubmitButton type="submit" value="Login" />
        </Form>
      </Wrapper>
  )
}

export default LoginForm