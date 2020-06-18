import express from 'express'
import { initServer } from 'universal-react-apollo'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from './serverConfig/webpack.config.js'
import routes from './serverConfig/routing'
import apolloOptions from './serverConfig/apolloOptions'

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler))

initServer(app, routes, apolloOptions)

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log('error: ', err)
  res.send('Oops... something went wrong')
})

app.listen(3000, () => console.log('Serving on localhost:3000'))
