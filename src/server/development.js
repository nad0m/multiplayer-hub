// we use .babelrc here to ensure this works in production
require('@babel/register')
require('@babel/polyfill')
require('dotenv').config()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackDevConfig = require('../config/webpack.config.dev.js')
const app = require('./server')

const PORT = process.env.PORT || 3000


const compiler = webpack(webpackDevConfig)

app.use(webpackDevMiddleware(compiler))
app.listen(PORT, () => console.log(`Serving on port ${PORT}`))



