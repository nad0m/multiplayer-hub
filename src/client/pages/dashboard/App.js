import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import GlobalStyle from '../../components/Utility/GlobalStyle'
import AuthProvider, {
  AuthContext,
} from '../../components/Providers/AuthProvider'
import use3tSockets from '../../hooks/gameSockets/use3tSockets'

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
  const [, forceUpdate] = useState({})
  const { logout } = useContext(AuthContext)

  const { socket, onSelect } = use3tSockets()
  useEffect(() => {
    console.log('component level socket', socket)
  }, [socket])

  return (
    <div>
      <button onClick={logout}>sign out</button>
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          forceUpdate({})
          onSelect({ x: 0, y: 0 })
        }}
      >
        Update here
      </button>
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
  description: 'Gaming Space dashboard description',
}

export default App
