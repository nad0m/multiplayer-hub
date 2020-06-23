const express = require('express')
const dotenv = require('dotenv')
// const { initServer } = require('universal-react-apollo')
const routes = require('../config/routes')
const apolloOptions = require('../config/apolloOptions')
const { applyRoutes } = require('./apolloUtils')
const { ApolloServer } = require('apollo-server-express')

dotenv.config()
const app = express()
console.log({routes})

const apolloServer = new ApolloServer(apolloOptions)
apolloServer.applyMiddleware({ app })

applyRoutes(app)
// initServer(app, routes, apolloOptions, process.env.NODE_ENV === 'production')

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

module.exports = app