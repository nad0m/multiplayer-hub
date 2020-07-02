import React, { useContext } from 'react'
import styled from 'styled-components'
import GlobalStyle from '../../components/Utility/GlobalStyle'
import AuthProvider, { AuthContext } from '../../components/Providers/AuthProvider'
import useComplexState from '../../hooks/useComplexState'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #332d3b;
  color: #eaeaea;
`

const Main = () => {
	const {
		isLoggedIn,
		initial,
		loading,
		success,
		logout,
	} = useContext(AuthContext)

  if (initial || loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <button onClick={logout}>sign out</button>
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Wrapper>
        <GlobalStyle />
        <Main />
      </Wrapper>
    </AuthProvider>
  )
}


export const pageConfig = {
  app: App,
  title: 'Gaming Space Dashboard',
  entry: 'dashboard',
  description: 'Gaming Space dashboard description'
}

export default App
