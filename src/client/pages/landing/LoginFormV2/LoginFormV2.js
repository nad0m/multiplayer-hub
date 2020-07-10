import React, { useContext } from 'react'
import { Google, Facebook } from '@styled-icons/boxicons-logos'

import { Wrapper, Header, OAuthGroup, OAuthButton, OrLabel, Form, Input, SubmitButton } from './LoginFormV2.styles'
import { AuthContext } from '../../../components/Providers/AuthProvider'
import useComplexState from '../../../hooks/useComplexState'


const LoginFormV2 = ({ isLoginForm }) => {
	const {
		loading,
		success,
		login
	} = useContext(AuthContext)
	const { state, setState } = useComplexState({})

	const updateFormState = e => {
		const { target: { name, value } } = e
		setState({ [name]: value })
	}

	const onSubmit = e => {
		e.preventDefault()
		login({ ...state })
	}

	return (
		<Wrapper
			disabled={loading || success}
			isLoginForm={isLoginForm}
		>
			<Header>Log in with</Header>
			<OAuthGroup>
				<OAuthButton><Google size="28" color="#f14236" />Google</OAuthButton>
				<OAuthButton><Facebook size="28" color="#4267b2" />Facebook</OAuthButton>
			</OAuthGroup>
			<OrLabel>or</OrLabel>
			<Form
				onSubmit={onSubmit}
				autoComplete="on"
			>
				<label>Email</label>
				<Input
					required
					name="email"
					type="email"
					placeholder="Enter email address"
					value={state.email}
					onChange={updateFormState}
				/>
				<label>Password</label>
				<Input
					required
					name="password"
					type="password"
					placeholder="Enter your password"
					value={state.password}
					onChange={updateFormState}
				/>
				<SubmitButton type="submit" value="Log In" />
			</Form>
		</Wrapper>
	)
}

export default LoginFormV2
