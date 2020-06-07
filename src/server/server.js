import express from 'express'
import { initServer } from 'universal-react-apollo'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'

import webpackConfig from '../../webpack.config'
import routes from './routes'
import apolloOptions from './apolloOptions'

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

app.listen(3000, () => console.log('Now that your universal app is ready to serve user'))
