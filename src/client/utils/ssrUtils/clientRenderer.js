import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ApolloClient } from 'apollo-client';
import SchemaLink from 'apollo-link-schema';
import { ApolloLink, from } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderToStringWithData, getDataFromTree } from 'react-apollo';

import ApolloClientProvider from '../../components/Utility/ApolloClientProvider';
import Document from '../../components/Utility/Document';
import { makeExecutableSchema } from 'apollo-server-express';


export const makeClient = ({ schema, clientOptions }) => {
	const schemaLink = new SchemaLink({
		schema,
		...clientOptions
	})


	return new ApolloClient({
		ssrMode: true,
		link: schemaLink,
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				errorPolicy: "all"
			},
			query: {
				errorPolicy: "all"
			},
			mutate: {
				errorPolicy: "all"
			}
		}
	})
}

export const makeHtmlGenerator = client => async ({ req, head, app, eob }) => {
	const headContent = await renderToStringWithData(<ApolloClientProvider client={client} req={req} Component={head} />)
	const appContent = await getDataFromTree(<ApolloClientProvider client={client} req={req} Component={app} />)
	const eobContent = await renderToStringWithData(<ApolloClientProvider client={client} req={req} Component={eob} />)

	const initialState = client.extract()
	const html = <Document state={initialState} headContent={headContent} appContent={appContent} eobContent={eobContent} />
	return `<doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`
}

