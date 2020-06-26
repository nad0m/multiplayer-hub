const http = require('http')
const express = require('express')
const { applyRoutes, makeServer } = require('./apolloServer')
const paths = require('../config/paths')


const PORT = process.env.PORT || 3000

const app = express()
const httpServer = http.createServer(app)
const apolloServer = makeServer()

// apply apollo middlewares
apolloServer.applyMiddleware({ app })
// apply http (websocket) middlewares
apolloServer.installSubscriptionHandlers(httpServer)
// apply routing configs and apollo client instances to express app
applyRoutes(app)

// apply webpack dev & hmr middlewares in dev
if (process.env.NODE_ENV === 'development') {
	require('./devMiddleware').apply(app)
	console.log('this should only be visible in dev...')
}
// exposing out public assets
app.use(paths.publicPath, express.static(paths.build));
// fallback
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

httpServer.listen(PORT, () => console.log(`Serving on port ${PORT}`))
