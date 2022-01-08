/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const { fixture } = require('./helper')
const pkgxo = require('../src')

describe('pkgxo', function () {
  afterEach(async () => {
    await pkgxo.updateDbAndSave(() => ({}))
  })
  it('submitAndSave & resetAndSave', async function () {
    const cwd = fixture('default')
    const prevPkg = await pkgxo.readPkg(cwd)
    await pkgxo.submitAndSave(require('../pnpm-manifest'), cwd)
    const pkg = await pkgxo.readPkg(cwd)

    expect(prevPkg).toEqual((await pkgxo.readDb())[cwd])
    expect(prevPkg).not.toEqual(pkg)

    await pkgxo.resetAndSave(cwd)
  })
})
