const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')

module.exports = {
  mode: 'production',
  entry: {
    landing: './src/client/pages/landing'
  },
  output: {
    path: paths.client,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: paths.resolvePath('../client'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              highlightCode: true
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  }
}
