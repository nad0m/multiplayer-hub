const path = require('path')

const resolvePath = relativePath => path.resolve(__dirname, relativePath)


module.exports = {
  resolvePath,
  root: resolvePath('.'),
  build: resolvePath('../../build'),
  client: resolvePath('../../build/client'),
  server: resolvePath('../../build/server'),
  src: resolvePath('../../src')
}