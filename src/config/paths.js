const fs = require('fs')
const path = require('path')

const resolvePath = relativePath =>
  path.resolve(__dirname, '../../', relativePath)

const basePaths = {
  root: resolvePath('.'),
  build: resolvePath('build'),
  client: resolvePath('src/client'),
  server: resolvePath('dist'),
  src: resolvePath('src'),
  pages: resolvePath('src/client/pages'),
  publicPath: '/public/',
}

/**
 * Get entry paths for each page.
 * This should work for directories and files
 */
const resolveEntries = () => {
  const pageEntries = fs.readdirSync(basePaths.pages)
  const entries = {}

  pageEntries.forEach(page => {
    // generate the page directory location
    const pagePath = `${basePaths.pages}/${page}`
    // check if page is a directory or a single file
    const isFolder = fs.statSync(pagePath).isDirectory()
    // add `/index.js` if it is a directory, otherwise, just use the page path ex: root/src/client/pages/PageName.js
    const pageEntries = isFolder ? [`${pagePath}/index.js`] : [pagePath]

    // we add this entry per page to enable webpack HMR
    if (process.env.NODE_ENV === 'development') {
      pageEntries.unshift(
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
      )
    }
    // add the page entries to the entries object
    entries[page] = ['normalize.css', 'isomorphic-fetch', ...pageEntries]
  })
  return entries
}

module.exports = {
  ...basePaths,
  entries: resolveEntries(),
}
