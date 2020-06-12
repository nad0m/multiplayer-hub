import express from 'express'
import { initServer } from 'universal-react-apollo'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackDevConfig from '../config/webpack.config.dev.js'
import routes from '../config/routes'
import apolloOptions from '../config/apolloOptions'

const app = express()
const compiler = webpack(webpackDevConfig)

app.use(webpackDevMiddleware(compiler))

initServer(app, routes, apolloOptions)

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Serving on localhost:3000'))
