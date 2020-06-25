import "isomorphic-fetch"
import ws from 'ws'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { SchemaLink } from 'apollo-link-schema';
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities'
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link'
import { InMemoryCache } from "apollo-cache-inmemory";
import { getDataFromTree } from 'react-apollo';

import ApolloClientProvider from '../../components/Utility/ApolloClientProvider';
import Document from '../../components/Utility/Document';
import { WS_ENDPOINT } from '../../../config/constants'


const splitByQuery = ({ query }) => {
	const definition = getMainDefinition(query);
	return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	);
}

/**
 * Makes a client instance with schema and websocket links.
 * read more: https://www.apollographql.com/docs/react/v3.0-beta/api/link/introduction/
 */
export const makeClient = ({ schema, clientContext: context }) => {
	const schemaLink = new SchemaLink({ schema, context })
	const wsClient = new SubscriptionClient(WS_ENDPOINT, { reconnect: true }, ws)
	const wsLink = new WebSocketLink(wsClient)

	/** NOTE: args[1] runs when the split comparator returns true
	 * args[2] runs when function returns false (strange logic if you ask me...) */
	const clientLink = split(splitByQuery, wsLink, schemaLink)

	return new ApolloClient({
		ssrMode: true,
		link: clientLink,
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

