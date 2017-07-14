const path = require('path')
const argv = require('yargs').argv

function relative(fp) {
  if (!fp) {
    return undefined
  }
  return path.resolve(process.cwd(), fp)
}

const flagArgs = {
  appIndex           : argv['app-index'],
  context            : argv['context'],
  faviconPath        : argv['favicon-path'],
  htmlIndex          : argv['html-index'],
  outputPath         : argv['output-path'],
  projectRoot        : argv['project-root'],
  resolveNodeModules : argv['resolve-node-modules'],
}

const appPaths = {
  appIndex           : relative(flagArgs.appIndex || './src/index.js'),
  context            : relative(flagArgs.context || './src'),
  faviconPath        : flagArgs.faviconPath && relative(flagArgs.faviconPath),
  htmlIndex          : relative(flagArgs.htmlIndex || './src/index.html'),
  outputPath         : relative(flagArgs.outputPath || './build'),
  projectRoot        : relative(flagArgs.projectRoot || '.'),
  resolveNodeModules : relative(flagArgs.resolveNodeModules || './node_modules'),
}

module.exports = appPaths
