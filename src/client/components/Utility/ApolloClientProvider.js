import React from 'react'
import { ApolloProvider } from 'react-apollo'


const ApolloClientProvider = ({ client, req, Component }) => (
	<ApolloProvider client={client}>
		<Component req={req} />
	</ApolloProvider>
)

export default ApolloClientProvider