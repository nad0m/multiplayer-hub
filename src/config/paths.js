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
		const pageEntries = isFolder ? [`${pagePath}/index.js`] : [pagePath]
		if (process.env.NODE_ENV === 'development') {
			pageEntries.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')
		}
		pages[page] = pageEntries
  })
  return pages
}

module.exports = {
  ...basePaths,
  entries: resolveEntries()
}

