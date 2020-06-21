import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import GlobalStyle from '../../components/Utility/GlobalStyle'

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

const App = () => {
  const { data: { currentUser } = {}, refetch } = useQuery(CURRENT_USER_QUERY)
  if (!currentUser) {
    if (typeof window !== 'undefined') {
      window.location.href = '/landing'
    }
  }
  console.log(currentUser)
  const [logoutUser] = useMutation(LOG_OUT_USER)
  return (
    <Wrapper>
      <GlobalStyle />
      <button onClick={e => {
        logoutUser()
        refetch()
      }}>sign out</button>
    </Wrapper>
  )
}


export const pageConfig = {
  app: App,
  title: 'Gaming Space Dashboard',
  entry: 'dashboard',
  description: 'Gaming Space dashboard description'
}

export default App