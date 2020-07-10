require('dotenv').config()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ManfestPlugin = require('webpack-manifest-plugin') // learn to spell doofus

const paths = require('./paths')

module.exports = {
  mode: 'production',
  performance: { hints: false },
  entry: paths.entries,
  output: {
    path: paths.build,
    filename: '[name].js',
		publicPath: 'https://multiplayerhub.wl.r.appspot.com/public/'
  },
  module: {
    rules: [
      // compile and minify our js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: paths.client,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              highlightCode: true
            }
          }
        ]
      },
      // load up any static styles
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // load up any files
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        include: paths.client,
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[ext]'
    }),
		new ManfestPlugin(),
		new webpack.EnvironmentPlugin([
			'NODE_ENV',
			'FIREBASE_PROD_API_KEY',
			'FIREBASE_APP_DOMAIN',
			'FIREBASE_DATABASE_URL',
			'FIREBASE_PROJECT_ID',
			'FIREBASE_STORAGE_BUCKET',
			'FIREBASE_M_SENDER_ID',
			'FIREBASE_APP_ID',
			'FIREBASE_MEASUREMENT_ID'
		])
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: /@license/i
      })
    ]
  }
}
