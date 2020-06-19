import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Banner from './Banner'
import LoginForm from './LoginForm'
import GlobalStyle from '../../components/Utility/GlobalStyle'
import RegisterForm from './LoginForm/RegisterForm'
import useAsync from '../../hooks/useLogin'

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

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  const onRegisterSubmit = (email = '', password = '') => {
    /*registerNewUser({ variables: { email, password } })
    .then (res => {
      if (res?.data?.registerNewUser?.success && window)
        window.location.href = '/greeting/visitor'
    })*/
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Banner />
        {
          isLoginForm ?
            <LoginForm
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