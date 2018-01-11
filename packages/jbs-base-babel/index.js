const BABEL_MODULE = process.env.BABEL_MODULE

module.exports = {
  presets: [
    require.resolve('babel-preset-stage-0'),
    [
      require.resolve('babel-preset-es2015'),
      {
        modules: ['false', false].includes(BABEL_MODULE)
          ? false
          : BABEL_MODULE || 'commonjs',
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-class-properties'),
  ],
}
