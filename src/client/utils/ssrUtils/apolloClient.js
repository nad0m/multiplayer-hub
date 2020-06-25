import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ApolloClient } from 'apollo-client';
import SchemaLink from 'apollo-link-schema';
import { InMemoryCache } from "apollo-cache-inmemory";
import { getDataFromTree } from 'react-apollo';

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

export const makeHtmlGenerator = client => async ({ req, head, app, eob }) => {
	const initialState = client.extract()
	// head and eod (end of body) content are usually static, so theres no need
	// to pre process or check for queries with `getDataFromTree` (Subject To Change...)
	const headContent = (
		<ApolloClientProvider client={client} req={req} Component={head} />
	)
	const eobContent = (
		<ApolloClientProvider client={client} req={req} Component={eob} />
	)
	// we use `getDataFromTree` here to fetch and resolve any queries necessary to before
	// we render the component. This loads our client store in preparation for render
	const appContent = await getDataFromTree(
		<ApolloClientProvider client={client} req={req} Component={app} />
	)
	// generate our static html
	const html = <Document state={initialState} headContent={headContent} appContent={appContent} eobContent={eobContent} />

	return `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`
}

