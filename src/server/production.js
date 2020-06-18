require('@babel/polyfill')
require('dotenv').config()

const express = require('express')
const paths = require('../config/paths')
const app = require('./server')


const PORT = process.env.PORT || 3000
const publicPath = '/';
const outputPath = paths.build;


app.use(publicPath, express.static(outputPath));

app.listen(PORT, () => console.log(`Serving on port ${PORT}`))

