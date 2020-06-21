import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Banner from './Banner'
import LoginForm from './LoginForm'
import GlobalStyle from '../../components/Utility/GlobalStyle'
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

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Banner />
        {
          isLoginForm ?
            <LoginForm setIsLoginForm={setIsLoginForm} />
            :
            <RegisterForm setIsLoginForm={setIsLoginForm} />
        }
      </Wrapper>
    </ThemeProvider>
  )
}

export const pageConfig = {
  app: App,
  title: 'Gaming Space landing page',
  entry: 'landing',
  description: 'Gaming Space description'
}

export default App