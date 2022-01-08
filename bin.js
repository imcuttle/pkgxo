#!/usr/bin/env node
const fs = require('fs')
const nps = require('path')
const pkg = require('./package.json')
const { resetAndSave, submitAndSave, clearAndSave } = require('./src')

const _pkgxoPath = nps.join(process.cwd(), 'pkgxo.js')
const pkgxoPath = fs.existsSync(_pkgxoPath) ? _pkgxoPath : './pnpm-manifest'

const usage = `Usage
  $ pkgxo
Options
  --submit, -s    Submit package updating
                  Use \`pnpm-manifest\` by default, see https://pnpm.io/package_json#publishconfig
                  You could use "pkgxo.js" in CWD for overwriting
  --reset, -r     Reset package updating
  --silent
  --version, -v
Examples
  $ pkgxo -s`

function run(args) {
  // Silent
  const silent = args.includes('--silent')

  // Submit
  if (args.includes('--submit') || args.includes('-s')) {
    if (!silent) console.log('pkgxo submit')
    return submitAndSave(require(pkgxoPath))
  }

  // Reset
  if (args.includes('--reset') || args.includes('-r')) {
    if (!silent) console.log('pkgxo reset')
    return resetAndSave().then(() => clearAndSave())
  }

  // Version
  if (args.includes('--version') || args.includes('-v')) {
    return console.log(pkg.version)
  }

  // No known flag provided
  console.log(usage)
  process.exit(1)
}

const [, , ...args] = process.argv
run(args).catch((err) => {
  console.error(err)
  process.exitCode = 1
})
