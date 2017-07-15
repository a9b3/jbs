/*
 * This file takes these arguments via the appPaths module.
 *
 * appPaths.appIndex
 * appPaths.outputPath
 * appPaths.htmlIndex
 * appPaths.resolveNodeModules
 * appPaths.faviconPath
 */

const path                    = require('path')
const webpack                 = require('webpack')
const HtmlWebpackPlugin       = require('html-webpack-plugin')
const ExtractText             = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin   = require('favicons-webpack-plugin')
const autoprefixer            = require('autoprefixer')
const appPaths                = require('../app-paths.js')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

// dev, production, test
const ENV = process.env.NODE_ENV || 'dev'

const webpackConfig = {
  // https://webpack.js.org/configuration/devtool/
  devtool: ENV !== 'production' ? 'cheap-module-source-map' : false,
  entry: {
    // generally just need one entry file, but if you want another tag for
    // something like google analytics script you can add to this array
    app: [appPaths.appIndex],
  },
  output: {
    path: appPaths.outputPath,
    publicPath: '/',
    filename: '[name].[hash].bundled.js',
    // Point sourcemap entries to original disk location
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L80
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      appPaths.resolveNodeModules,
    ]
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L91
    .concat((process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean)),
  },
  module: {
    strictExportPresence: true,
    rules: [
      // every other filetype gets the file loader
      {
        exclude: [
          /\.jsx?$/,
          /\.tsx?$/,
          /\.scss$/,
          /\.css$/,
          /\.html$/,
          /\.json$/,
          /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          /\.(png|jpe?g|gif|svg|ico)$/,
        ],
        loader: require.resolve('file-loader'),
      },
      {
        test: /\.html$/,
        loader: require.resolve('html-loader'),
      },
      {
        test: /\.json$/i,
        loader: require.resolve('json-loader'),
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: require.resolve('url-loader'),
        options: {
          // if asset is higher than limit, the file-loader will be used
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 8192,
            },
          },
          {
            loader: require.resolve('image-webpack-loader'),
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interfaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ].filter(a => a),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            // faster rebuilds
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: require.resolve('ts-loader'),
        },
      },
      {
        test: /\.scss$/,
        use: genStyleLoaders({ css: false }),
      },
      {
        test: /\.css$/,
        use: genStyleLoaders({ css: true }),
      },
    ],
  },
  // https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    process.env.BABEL_REACT && new webpack.ProvidePlugin({
      '_': 'lodash',
      'React': 'react',
      'cssModule': 'react-css-modules',
      'Promise': 'bluebird',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce((env, key) => {
        env[key] = JSON.stringify(process.env[key])
        return env
      }, {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
      }),
    }),
    new HtmlWebpackPlugin(Object.assign(
      {},
      // default configs
      {
        inject: true,
        template: appPaths.htmlIndex,
      },
      // production configs
      ENV === 'production' && {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    )),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
    }),
    new webpack.LoaderOptionsPlugin({
      // https://webpack.js.org/guides/migrating/#debug
      // image-webpack-loader uses this to bypass optimization in development
      // mode (webpack dev server)
      debug: ENV === 'dev',
    }),
    ENV === 'dev' && new webpack.NamedModulesPlugin(),
    ENV === 'dev' && new webpack.NoEmitOnErrorsPlugin(),
    ENV === 'production' && new ExtractText({
      filename: '[name].[hash].bundle.css',
    }),
    ENV === 'production' && new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200,
    }),
    ENV === 'production' && new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compressor: {
        warnings: false,
      },
    }),
    ENV === 'production' && new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    // https://github.com/jantimon/favicons-webpack-plugin
    ENV === 'production' && appPaths.faviconPath && new FaviconsWebpackPlugin({
      logo: appPaths.faviconPath,
      icons: {
        favicons: true,
      },
    }),
  ].filter(Boolean),
}

function genStyleLoaders({ css =  false } = {}) {
  const sourceMap = ENV !== 'production'
  const styleLoader = {
    loader: require.resolve('style-loader'),
    options: {
      sourceMap,
    },
  }
  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      modules: true,
      importLoaders: '1',
      localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
      sourceMap,
    },
  }
  const postCssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugin: () => [
        autoprefixer(),
      ],
      sourceMap,
    },
  }
  const sassLoader = {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap,
    },
  }

  return ENV === 'production'
    ?
      ExtractText.extract({
        fallback: require.resolve('style-loader'),
        use: [
          cssLoader,
          postCssLoader,
          css ? undefined : sassLoader,
        ].filter(a => a),
      })
    :
      [
        styleLoader,
        cssLoader,
        postCssLoader,
        css ? undefined : sassLoader,
      ].filter(a => a)
}

if (ENV === 'test') {
  delete webpackConfig.entry
  delete webpackConfig.output
}

module.exports = webpackConfig
