const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

module.exports = function babelBuild({
  input,
  output,
}) {
  const isDir = fs.lstatSync(input).isDirectory()
  const babelCliPath = require.resolve('babel-cli/bin/babel')

  const inputPath = path.resolve(process.cwd(), input)
  const outputPath = path.resolve(process.cwd(), output)

  let cmd = `${babelCliPath} ${inputPath}`
  cmd += isDir ? ` --out-dir ${outputPath} --copy-files` : ` ${outputPath}`

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return console.error(err)
    }

    console.log(stdout)
  })
}
