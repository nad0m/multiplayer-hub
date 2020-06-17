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
  const { data } = useQuery(CURRENT_USER_QUERY)

  console.log({ data })
  return (
    <Wrapper>
      <h1>{data?.greeting && data?.greeting?.content}</h1>
      <button onClick={() => console.log('event handler attached')}>Click me</button>
    </Wrapper>
  )
}

export default App