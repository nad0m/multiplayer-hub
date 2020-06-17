const path = require('path')
const fs = require('fs')

const resolvePath = relativePath => path.resolve(__dirname, relativePath)

/**
 * We use this to dynamically create our webpack entries object
 * ```
 * {
 *   "page": "<root path>/mutliplayer-hub/src/client/pages/page"
 * }
 * ```
 */
const resolveEntries = () => {
  const pageEntries = fs.readdirSync(resolvePath('../client/pages'))
  const pages = {}
  pageEntries.forEach(page => (pages[page] = resolvePath(`../client/pages/${page}`)))
  return pages
}

module.exports = {
  resolvePath,
  entries: resolveEntries(),
  root: resolvePath('../../'),
  build: resolvePath('../../build'),
  client: resolvePath('../../src/client'),
  server: resolvePath('../../dist'),
  src: resolvePath('../../src')
}