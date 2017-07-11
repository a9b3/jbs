const BABEL_REACT = process.env.BABEL_REACT
process.env.BABEL_MODULE = false

module.exports = {
  presets: [
    require.resolve('jbs-base-babel'),
    BABEL_REACT && require.resolve('babel-preset-react'),
  ].filter(a => a),
  plugins: [
    BABEL_REACT && require.resolve('react-hot-loader/babel'),
  ].filter(a => a),
}
