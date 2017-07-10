// set env var in ci configs
const isCI = process.env.CONTINUOUS_INTEGRATION
const webpackConfig = require('./webpack.config.js')
const appPaths = require('../app-paths.js')

module.exports = function getKarmaConf(config) {
  const patternPath = path.resolve(appPaths.projectRoot) + '/!(node_modules|build|lib)/**/*.spec.js?(x)'

  return {
    // default is 9876
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: [
      isCI ? 'PhantomJS' : 'Chrome',
    ],
    singleRun: false,
    frameworks: [
      'mocha',
    ],
    files: [
      {
        pattern: patternPath,
        // uncomment if you dont want to watch
        // watched: false,
        included: true,
        served: true,
      },
    ],
    preprocessors: {
      [patternPath]: [
        'webpack',
        'sourcemap',
      ],
    },
    reporters: [
      'dots',
      'mocha',
    ],
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      // required by enzyme
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
  }
}
