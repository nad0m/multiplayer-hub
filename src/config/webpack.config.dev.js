const webpack = require('webpack')
const paths = require('./paths')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: paths.entries,
  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: paths.client,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              highlightCode: true,
            },
          },
        ],
      },
      // load up any static styles
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      // load up any files
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        include: paths.client,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ManifestPlugin({ writeToFileEmit: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'FIREBASE_PROD_API_KEY',
      'FIREBASE_APP_DOMAIN',
      'FIREBASE_DATABASE_URL',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_STORAGE_BUCKET',
      'FIREBASE_M_SENDER_ID',
      'FIREBASE_APP_ID',
      'FIREBASE_MEASUREMENT_ID',
    ]),
  ],
}
