const path = require('path')
const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: paths.pageEntries,
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, '../client'),
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
  }
}