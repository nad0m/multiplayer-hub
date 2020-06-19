const fs = require('fs')
const path = require('path')

const resolveApp = relativePath => path.resolve(__dirname, '../../', relativePath)
const pageEntries = (() => {
  const pagesPath = resolveApp('src/client/pages')
  const files = fs.readdirSync(pagesPath)

  return files
    .filter(file => fs.statSync(`${pagesPath}/${file}`).isDirectory())
    .reduce((acc, pageName) => {
      const entryFilePath = resolveApp(`src/client/pages/${pageName}/index.js`)
      return { ...acc, [pageName]: [entryFilePath] }
    }, {})
})()

console.log(resolveApp)

module.exports = {
  root: resolveApp('.'),
  build: resolveApp('build'),
  client: resolveApp('src/client'),
  server: resolveApp('dist'),
  src: resolveApp('src'),
  pageEntries
}

