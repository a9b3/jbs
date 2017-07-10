module.exports = {
  presets: [
    require.resolve('jbs-base-babel'),
    [require.resolve('babel-preset-es2015'), {
      modules: false,
    }],
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('react-hot-loader/babel'),
  ],
}
