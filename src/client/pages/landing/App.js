import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Banner from './Banner'
import LoginForm from './LoginForm'
import GlobalStyle from '../../components/GlobalStyle'
import RegisterForm from './LoginForm/RegisterForm'

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1100,
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
`

const REGISTER_USER_MUTATION = gql`
  mutation RegisterNewUser($email: String!, $password: String!) {
    registerNewUser(email: $email, password: $password) {
      success
    }
  }
`

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      success
    }
  }
`

const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      displayName
      email
      emailVerified
      isAnonymous
      metadata {
        creationTime
        lastSignInTime
      }
      phoneNumber
      photoURL
      providerId
      refreshToken
      tenantId
      uid
    }
  }
`

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [registerNewUser, { data: user }] = useMutation(REGISTER_USER_MUTATION)
  const [loginUser, { data: login }] = useMutation(LOGIN_USER_MUTATION)
  const { data } = useQuery(CURRENT_USER_QUERY)

  console.log({ data })

  const onLoginSubmit = (email = '', password = '') => {
    loginUser({ variables: { email, password } })
    console.log({ data, user, login })
  }

  const onRegisterSubmit = (email = '', password = '') => {
    registerNewUser({ variables: { email, password }})
    console.log({ email, password, data })
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Banner />
        {
          isLoginForm ?
            <LoginForm
              onLoginSubmit={onLoginSubmit}
              setIsLoginForm={setIsLoginForm}
            /> :
            <RegisterForm
              onRegisterSubmit={onRegisterSubmit}
              setIsLoginForm={setIsLoginForm}
            />
        }
      </Wrapper>
    </ThemeProvider>
  )
}

export const appConfig = {
  appComponent: <App />,
  title: 'Gaming Space landing page',
  entryName: 'landing',
  description: 'Gaming Space description'
}

export default App