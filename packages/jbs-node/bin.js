#!/usr/bin/env node
const argv = require('yargs').argv

try {
  switch (argv._[0]) {
    case 'build':
      require('./scripts/build.js')({
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
