import React from 'react'
import styled from 'styled-components'
import { Mail } from '@styled-icons/heroicons-outline/Mail'
import { Lock } from '@styled-icons/boxicons-regular/Lock'

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 30px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: #f3f6fb;
  box-shadow: 0 1px 1px rgba(255, 255, 255, .9), 0 -1px 1px rgba(0, 0, 0, .1);
`

const Input = styled.input`
  width: 100%;
  margin: 0 0 0 10px;
  font-weight: bold;
  background-color: inherit;
  border: none;
  outline: none;

  &::placeholder {
    color: #c5c8cf;
  }
`

const InputField = ({ type, placeholder, value, setValue }) => {

  const Icon = type === "password" ? Lock : Mail

  return (
    <InputWrapper>
      <Icon size="24" strokeWidth="2" color="#c5c8cf" />
      <Input type={type} placeholder={placeholder} value={value} />
    </InputWrapper>
  )
}

export default InputField