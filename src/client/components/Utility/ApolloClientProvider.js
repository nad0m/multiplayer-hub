import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'

const ApolloClientProvider = ({ client, req, Component }) => (
  <ApolloProvider client={client}>
    <Component req={req} />
  </ApolloProvider>
)

ApolloClientProvider.propTypes = {
  client: PropTypes.object,
  req: PropTypes.object,
  Component: PropTypes.element,
}

export default ApolloClientProvider
