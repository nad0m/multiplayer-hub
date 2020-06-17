const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    landing: ['@babel/polyfill', './src/client/pages/landing']
  },
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