const express = require('express')
const dotenv = require('dotenv')

const { applyRoutes, makeServer } = require('./apolloServer')


// set our env variables (defaults to `.env` at root)
dotenv.config()

// make our express app
const app = express()

// create apollo server instance and apply middlewares
makeServer(app)
// apply routing configs and apollo client instances to express server
applyRoutes(app)

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

module.exports = app
