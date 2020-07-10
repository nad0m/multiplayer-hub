const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHMR = require('webpack-hot-middleware')
const webpackDevConfig = require('../config/webpack.config.dev.js')

/**
 *
 * @param {Express} app
 */
function applyDevMiddleware(app) {
  // configure webpack
  const compiler = webpack(webpackDevConfig)
  // add dev middleware to our custom server
  app.use(
    webpackDevMiddleware(compiler, {
      stats: { colors: true },
      publicPath: webpackDevConfig.output.publicPath,
    })
  )
  // add hot module reload middleware
  app.use(webpackHMR(compiler, { heartbeat: 2000 }))
}

module.exports = {
  apply: applyDevMiddleware,
}
