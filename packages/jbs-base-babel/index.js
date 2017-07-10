module.exports = {
  "presets": [
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-es2015'),
  ],
  "plugins": [
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-transform-class-properties'),
  ],
}
