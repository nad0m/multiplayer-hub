import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

const GET_MESSAGE = gql`
  query getMessage {
    greeting {
      content
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

const Wrapper = styled.div`
  background-color: blue;
`

const App = () => {
  const { data } = useQuery(GET_MESSAGE)
  const { data: { currentUser } = {} } = useQuery(CURRENT_USER_QUERY)

  
  return (
    <Wrapper>
      <h1>{data && data?.greeting?.content}</h1>
      <button onClick={() => console.log('event handler attached')}>Click me</button>
    </Wrapper>
  )
}


export const appConfig = {
  appComponent: <App />,
  title: 'Gaming Space landing page',
  entryName: 'example',
  description: 'Gaming Space description'
}

export default App