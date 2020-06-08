import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import LoginForm from './LoginForm'

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1300,
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
`

const Banner = styled.div`
  width: 50%;
  height: 100%;
  clip-path: circle(78% at 16% 28%);
  background-image: linear-gradient(to top right, #00802b , #00ff55);
  display: none;
  color: white;
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  justify-content: center;
  align-items: center;

  ${breakpoint('xl')`
    display: flex;
  `}
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Banner>
          Welcome
        </Banner>
        <LoginForm />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App