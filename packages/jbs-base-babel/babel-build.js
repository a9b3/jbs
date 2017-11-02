const fs       = require('fs')
const path     = require('path')
const { exec } = require('child_process')

/**
 * Executes babel cli with the given input and output.
 *
 * @param {string} input
 * @param {string} output
 * @param {string} [esInputFile]
 * @param {string} [esOutputFile]
 */
module.exports = function babelBuild({
  input,
  output,
  esInputFile,
  esOutputFile,
} = {}) {
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

    if (esInputFile && esOutputFile) {
      process.env.BABEL_MODULE = false

      const esInputFilePath = path.resolve(process.cwd(), esInputFile)
      const esOutputFilePath = path.resolve(process.cwd(), esOutputFile)

      let cmd  = `${babelCliPath} ${esInputFilePath} -o ${esOutputFilePath}`
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          return console.error(err)
        }

        console.log(stdout)
      })
    }
  })
}
