const BABEL_MODULE = process.env.BABEL_MODULE

module.exports = {
  "presets": [
    require.resolve('babel-preset-stage-0'),
    [require.resolve('@babel/preset-env'), {
      modules: ['false', false].includes(BABEL_MODULE) ? false : BABEL_MODULE || 'commonjs',
    }],
  ],
}
