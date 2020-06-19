const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  mode: 'development',
  entry: paths.pageEntries,
  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.client,
        use: [
          {
            loader: 'babel-loader',
            options: {
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[ext]'
    }),
    new ManifestPlugin()
  ],
}