const { makeExecutableSchema, ApolloServer } = require("apollo-server-express");
const chalk = require('chalk')

const { makeClient, makeHtmlGenerator } = require("../client/utils/ssrUtils/apolloClient");
const apolloOptions = require('../config/apolloOptions');
const routes = require('../config/routes')


const {
	typeDefs,
	resolvers,
	schemaDirectives,
	context,
	dataSources
} = apolloOptions

// here we create a new apollo server instance and applu the app middleware
const makeServer = () => new ApolloServer({
	...apolloOptions,
	dataSources,
	subscriptions: {
		path: '/sockets',
		onConnect: (connectionParams, webSocket, context) => console.log('bitch, we made it', connectionParams),
		onDisconnect: (webSocket, context) => console.log('bitch, we lost it?'),
	}
})

// make schema for gql
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	schemaDirectives
});

// we apply each route
const applyRoutes = expressApp => {
	routes.forEach(({ path, head, app, eob }) => {
		expressApp.get(path, async (req, res, next) => {
			const appContext = context({ req })

			// make a client instance and use it to generate apollo provider wrapped app
			const client = makeClient({ schema, context: appContext, dataSources })
			const generateHtml = makeHtmlGenerator(client)

			generateHtml({ req, head, app, eob })
				.then(html => {
					console.log('served:', chalk.green(req.url))
					res.status(200)
					res.send(html)
					res.end()
				})
				.catch(err => {
					console.log(err)
					next(err)
				})
		})
	})
}

module.exports = {
	makeServer,
	applyRoutes
}
