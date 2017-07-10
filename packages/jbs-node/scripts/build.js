const { exec }   = require('child_process')
const babelBuild = require('jbs-base-babel/babel-build')

module.exports = function build({
  commands,
  flags,
}) {
  if (!flags.input || !flags.output) {
    console.log(flags)
    throw new Error(`require both --input and --output to be specified`)
  }

  babelBuild({
    input: flags.input,
    output: flags.output,
  })
}
