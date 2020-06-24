import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ApolloClient } from 'apollo-client';
import SchemaLink from 'apollo-link-schema';
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderToStringWithData, getDataFromTree } from 'react-apollo';

import ApolloClientProvider from '../../components/Utility/ApolloClientProvider';
import Document from '../../components/Utility/Document';


export const makeClient = ({ schema, linkOptions }) => {
	const schemaLink = new SchemaLink({
		schema,
		...linkOptions
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

export const makeHtmlGenerator = (ssrClient, client) => async ({ req, head, app, eob }) => {
	const headContent = await renderToStringWithData(<ApolloClientProvider client={ssrClient} req={req} Component={head} />)
	const appContent = await getDataFromTree(<ApolloClientProvider client={client} req={req} Component={app} />)
	const eobContent = <ApolloClientProvider client={client} req={req} Component={eob} />

	const initialState = client.extract()
	const html = <Document state={initialState} headContent={headContent} appContent={appContent} eobContent={eobContent} />
	return ReactDOMServer.renderToStaticMarkup(html)
}

