const path = require('path')
const Karma = require('karma').Server

module.exports = function runKarmaTest({ flags }) {
  new Karma(
    {
      configFile: path.resolve(__dirname, '../configs/karma.react.conf.js'),
      singleRun: flags.singleRun,
    },
    exitCode => {
      // done do nothing
      process.exit(exitCode)
    },
  ).start()
}
