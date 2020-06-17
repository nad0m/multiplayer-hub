const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


const resolvePath = relativePath => path.resolve(__dirname, relativePath)
// this script will copy and paste a directory from a src to a dest...
const copyRecursiveSync = (src, dest, level = 1) => {
  try {
    const exists = fs.existsSync(src)
    const stats = exists && fs.statSync(src)
    const isDirectory = exists && stats.isDirectory()
    if (isDirectory) {
      fs.mkdirSync(dest)
      const internals = fs.readdirSync(src)
      internals.forEach(childItemName => {
        if (level === 1) console.log('Copying:', `${childItemName}/`)  
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), level + 1)
      })
    } else {
      fs.copyFileSync(src, dest)
    }
  } catch (err) {
    console.log(chalk.redBright(err))
  }
}

const source = resolvePath('../src')
const target = resolvePath('../dist')

console.log(chalk.yellowBright('Attempting to copy internals from src/ to dist/'))
copyRecursiveSync(source, target)
console.log(chalk.greenBright.bold('Successfully copied server directory\n'))
