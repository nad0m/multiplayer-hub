const fs = require('fs')
const path = require('path')

const resolveApp = relativePath => path.resolve(__dirname, '../', relativePath)
const pageEntries = (() => {
  const pagesPath = resolveApp('client/pages')
  const files = fs.readdirSync(pagesPath)

  return files
    .filter(file => fs.statSync(`${pagesPath}/${file}`).isDirectory())
    .reduce((acc, pageName) => {
      const entryFilePath = resolveApp(`client/pages/${pageName}/index.js`)
      return { ...acc, [pageName]: [entryFilePath] }
    }, {})
})()

module.exports = {
  root: resolveApp('.'),
  build: resolveApp('build'),
  statics: resolveApp('statics'),
  src: resolveApp('src'),
  nodeModules: resolveApp('node_modules'),
  packageJson: resolveApp('package.json'),
  pageEntries
}