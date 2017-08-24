#!/usr/bin/env node
const argv = require('yargs').argv
require('dotenv').config()

try {
  switch(argv._[0]) {
    case 'build':
      process.env.NODE_ENV = 'production'
      require('./scripts/build.js')({
        commands: argv._,
        flags: argv,
      })
      break
    case 'dev':
      process.env.NODE_ENV = 'development'
      require('./scripts/dev.js')({
        commands: argv._,
        flags: argv,
      })
      break
    case 'build:package':
      process.env.NODE_ENV = 'production'
      require('./scripts/build-package.js')({
        commands: argv._,
        flags: argv,
      })
      break
    case 'test':
      process.env.APP_ENV = 'test'
      require('./scripts/karma.js')({
        commands: argv._,
        flags: argv,
      })
      break
    default:
      break
  }
} catch (err) {
  console.error(err.toString())
}
