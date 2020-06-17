import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Banner from './Banner'
import LoginForm from './LoginForm'
import GlobalStyle from '../../components/GlobalStyle'

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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Banner />
        <LoginForm />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App