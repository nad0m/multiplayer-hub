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
			const clientOptions = {
				context: {
					...appContext,
					dataSources
				}
			}
			const apolloClient = makeClient({ schema, clientOptions })
			const generateHtml = makeHtmlGenerator(apolloClient)
			const document = await generateHtml({ req, head, app, eob })

			res.status(200)
			res.send(document)
			res.catch(err => {
				console.log(err);
				next(error);
			})
		})
	})
}

module.exports = {
	applyRoutes
}