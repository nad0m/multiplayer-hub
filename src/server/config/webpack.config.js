module.exports = {
  mode: 'production',
  entry: {
    landing: './src/client/pages/landing',
    example: './src/client/pages/example'
  },
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
  }
}
