const nps = require('path')
const makePublishManifest = require('@pnpm/exportable-manifest').default

module.exports = async function (pkg, filename) {
  const scripts = pkg.scripts
  pkg.scripts = null

  pkg = await makePublishManifest(nps.dirname(filename), pkg)
  pkg.scripts = scripts
  return pkg
}
