const nps = require('path')
const makePublishManifest = require('@pnpm/exportable-manifest').default

module.exports = function (pkg, filename) {
  return makePublishManifest(nps.dirname(filename), pkg)
}
