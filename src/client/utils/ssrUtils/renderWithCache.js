import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import { REACT_ROOT } from "../../../config/constants";


// hydrates the given `AppComponent` with the client store
export const renderWithCache = AppComponent => {
	const client = new ApolloClient({
		link: createHttpLink({
			uri: "/graphql",
			credentials: "same-origin"
		}),
		cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
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

	const app = (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<AppComponent />
			</BrowserRouter>
		</ApolloProvider>
	)

	ReactDOM.hydrate(app, document.getElementById(REACT_ROOT))
}

export default renderWithCache
