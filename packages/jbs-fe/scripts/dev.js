const path             = require('path')
const webpack          = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const appPaths         = require('../app-paths.js')
const wpConfig         = require('../configs/webpack.config.js')

module.exports = function webpackDev() {
  const port = process.env.PORT || 8080

  wpConfig.entry.app.unshift('webpack-dev-server/client?')
  wpConfig.entry.app.unshift('webpack/hot/dev-server')
  wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  const server = new WebpackDevServer(webpack(wpConfig), {
    contentBase: appPaths.context,
    hot: true,
    inline: true,
    historyApiFallback: true,
    clientLogLevel: 'error',
    stats: {
      colors: true,
    },
  })

  server.listen(port, (err) => {
    if (err) {
      return console.error(err)
    }

    console.log(`[webpack dev] listening on port ${port}...`)
  })
}
