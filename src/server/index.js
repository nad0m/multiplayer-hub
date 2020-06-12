require('@babel/register')({
  babelrc: false,
  presets: ['@babel/react', '@babel/env']
})
require('@babel/polyfill')
require('dotenv').config()
require('./server')
