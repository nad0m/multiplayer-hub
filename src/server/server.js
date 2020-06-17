const express = require('express')
const dotenv = require('dotenv')
const { initServer } = require('universal-react-apollo')
const routes = require('../config/routes')
const apolloOptions = require('../config/apolloOptions')

dotenv.config()
const app = express()

initServer(app, routes, apolloOptions, process.env.NODE_ENV === 'production')

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

module.exports = app