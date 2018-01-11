const getKarmaConf = require('./get-karma-conf.js')

module.exports = function(config) {
  const karmaConf = getKarmaConf(config)

  karmaConf.webpack.externals = Object.assign({}, karmaConf.webpack.externals, {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  })

  config.set(karmaConf)
}
