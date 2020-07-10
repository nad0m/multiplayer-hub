import React, { useContext } from 'react'

import {
  Wrapper,
  Header,
  Form,
  Input,
  SubmitButton,
} from './LoginFormV2.styles'
import { AuthContext } from '../../../components/Providers/AuthProvider'
import useComplexState from '../../../hooks/useComplexState'

const RegisterFormV2 = () => {
  const { loading, success, register } = useContext(AuthContext)
  const { state, setState } = useComplexState({})

  const updateFormState = e => {
    const {
      target: { name, value },
    } = e
    setState({ [name]: value })
  }

  const onFormSubmit = e => {
    e.preventDefault()
    if (state.password === state.confirm) register({ ...state })
  }

  return (
    <Wrapper disabled={loading || success}>
      <Header>Register below</Header>
      <Form onSubmit={onFormSubmit}>
        <label>Email</label>
        <Input
          required
          type="email"
          name="email"
          placeholder="Enter email address"
          value={state.email}
          onChange={updateFormState}
        />
        <label>Password</label>
        <Input
          required
          type="password"
          name="password"
          placeholder="Enter your password"
          value={state.password}
          onChange={updateFormState}
        />
        <label>Password verify</label>
        <Input
          required
          type="password"
          name="confirm"
          placeholder="Verify your password"
          value={state.passwordCheck}
          onChange={updateFormState}
        />
        <SubmitButton type="submit" value="Sign Up" />
      </Form>
    </Wrapper>
  )
}

export default RegisterFormV2
