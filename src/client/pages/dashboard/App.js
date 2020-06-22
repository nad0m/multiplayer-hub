import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import GlobalStyle from '../../components/Utility/GlobalStyle'
import useAuth from '../../hooks/useAuth'
import AuthProvider from '../../components/Providers/AuthProvider'

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

const LOG_OUT_USER = gql`
  mutation {
    logoutUser {
      success
    }
  }
`

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
  const { logout, isLoggedIn } = useAuth()
  const { 
    invokeLogout,
    pending,
    logoutSuccess,
    error } = logout()

  console.log({ isLoggedIn })

  if (isLoggedIn === false) {
    if (typeof window !== 'undefined') {
      window.location.href = '/landing'
    }
  }

  return (
    <div>
      <button onClick={e => {
        invokeLogout()
      }}>sign out</button>
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