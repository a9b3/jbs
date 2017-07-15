process.env.BABEL_MODULE = false

const webpack  = require('webpack')
const wpConfig = require('../configs/webpack.config.js')

module.exports = function build({
  commands,
  flags,
}) {
  const statsArgs = {
    chunks: false,
    colors: true,
  }

  webpack(wpConfig, (err, stats) => {
    if (err) {
      return console.error(err)
    }

    const jsonStats = stats.toJson()
    if (jsonStats.errors.length > 0) {
      return console.error(stats.toString(statsArgs))
    }
    if (jsonStats.warnings.length > 0) {
      console.log(stats.toString(statsArgs))
    }

    console.log(stats.toString(statsArgs))
  })
}
