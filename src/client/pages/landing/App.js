import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import LoginFormV2 from './LoginFormV2'
import GlobalStyle from '../../components/Utility/GlobalStyle'
import RegisterFormV2 from './LoginFormV2/RegisterFormV2'

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #332d3b;
  color: #eaeaea;
`

const ToggleForm = styled.label`
  margin: 25px 0;

  > a {
    text-decoration: none;
    color: #8e80f5;

    &:hover {
      filter: brightness(95%);
      cursor: pointer;
    }
  }
`

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {
          isLoginForm ? <LoginFormV2 isLoginForm={isLoginForm} /> : <RegisterFormV2 />
        }
        <ToggleForm>Don't have an account? <a onClick={e => setIsLoginForm(!isLoginForm)}>Sign up</a></ToggleForm>
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