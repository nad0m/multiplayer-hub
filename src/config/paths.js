const fs = require('fs')
const path = require('path')


const resolvePath = relativePath => path.resolve(__dirname, '../../', relativePath)

const basePaths = {
  root: resolvePath('.'),
  build: resolvePath('build'),
  client: resolvePath('src/client'),
  server: resolvePath('dist'),
  src: resolvePath('src'),
  pages: resolvePath('src/client/pages')
}

/**
 * Get entry paths for each page.
 * This should work for directories and files
 */
const resolveEntries = () => {
  const pageEntries = fs.readdirSync(basePaths.pages)
  const pages = {}

  pageEntries.forEach(page => {
    const pagePath = `${basePaths.pages}/${page}`
    const isFolder = fs.statSync(pagePath).isDirectory()
    if (isFolder) return pages[page] = `${pagePath}/index.js`
    return pages[page] = pagePath
  })
  return pages
}

module.exports = {
  ...basePaths,
  entries: resolveEntries()
}

