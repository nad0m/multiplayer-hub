import React from 'react'
import PropTypes from 'prop-types'
import { Mail } from '@styled-icons/heroicons-outline/Mail'
import { Lock } from '@styled-icons/boxicons-regular/Lock'

import { InputWrapper, Input } from './InputField.styles'

const InputField = ({ type, placeholder, value, setValue }) => {
  const Icon = type === "password" ? Lock : Mail
  return (
    <InputWrapper>
      <Icon size="24" strokeWidth="2" color="#c5c8cf" />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </InputWrapper>
  )
}

InputField.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.any,
	setValue: PropTypes.func
}

export default InputField
