const ManifestPlugin = require('webpack-manifest-plugin')
const paths = require('./paths')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: paths.pageEntries,
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
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
  },
  plugins: [
    new ManifestPlugin({ writeToFileEmit: true }), 
    new webpack.HotModuleReplacementPlugin()
  ]
}