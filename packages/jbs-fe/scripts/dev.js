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
    // TODO pass this in via flag
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // https://github.com/webpack/webpack-dev-server/issues/882
    disableHostCheck: true,
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
