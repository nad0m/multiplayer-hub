require('@babel/polyfill')
// set our env variables (defaults to `.env` at root)
require('dotenv').config()

// register our babel config if running in dev
if (process.env.NODE_ENV === 'development') require('@babel/register')

// initialize server
require('./server')
