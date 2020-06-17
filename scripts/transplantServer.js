const fs = require('fs')
const path = require('path')

const resolvePath = relativePath => path.resolve(__dirname, relativePath)

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

const source = resolvePath('../src')
const target = resolvePath('../dist')

copyRecursiveSync(source, target)