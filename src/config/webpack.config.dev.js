const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    landing: './src/client/pages/landing'
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, '../client'),
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