const { SchemaLink } = require("apollo-link-schema");
const { makeExecutableSchema } = require("apollo-server-express");

const { makeClient, makeHtmlGenerator } = require("../client/utils/ssrUtils/clientRenderer");
const routes = require('../config/routes')
const apolloOptions = require('../config/apolloOptions');

const {
	typeDefs,
	resolvers,
	schemaDirectives,
	context,
	dataSources
} = apolloOptions

// make schema for gql
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	schemaDirectives
});

const applyRoutes = expressApp => {
	routes.forEach(({ path, head, app, eob }) => {
		expressApp.get(path, async (req, res, next) => {
			const appContext = context({ req })
			const linkOptions = {
				context: {
					...appContext,
					dataSources
				}
			}
			const ssrClient = makeClient({ schema, linkOptions })
			const client = makeClient({ schema, linkOptions })

			const generateHtml = makeHtmlGenerator(ssrClient, client)
			generateHtml({ req, head, app, eob })
			.then(html => {
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
	applyRoutes
}
