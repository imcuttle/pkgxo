# pkgxo

[![Build status](https://img.shields.io/github/workflow/status/imcuttle/pkgxo/Test/master?style=flat-square)](https://github.com/imcuttle/pkgxo/actions)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/pkgxo/master.svg?style=flat-square)](https://codecov.io/github/imcuttle/pkgxo?branch=master)
[![NPM version](https://img.shields.io/npm/v/pkgxo.svg?style=flat-square)](https://www.npmjs.com/package/pkgxo)
[![NPM Downloads](https://img.shields.io/npm/dm/pkgxo.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/pkgxo)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> lets you can update package.json when publish

## Installation

```bash
pnpm add pkgxo -D
```

## Usage

```json
{
  "main": "index.ts",
  "publishConfig": {
    "main": "index.js"
  },
  "scripts": {
    "prepublishOnly": "pkgxo --submit",
    "postpublish": "pkgxo --reset"
  }
}
```

`pkgxo --submit` would update package.json, use [pnpm-manifest](https://pnpm.io/package_json#publishconfig) by default.

`package.json` is follow

```json
{
  "main": "index.js",
  "publishConfig": {
    "main": "index.js"
  },
  "scripts": {
    "prepublishOnly": "pkgxo --submit",
    "postpublish": "pkgxo --reset"
  }
}
```

`pkgxo --reset` would reset the latest package.json when submitted.

`package.json` is follow

```json
{
  "main": "index.ts",
  "publishConfig": {
    "main": "index.js"
  },
  "scripts": {
    "prepublishOnly": "pkgxo --submit",
    "postpublish": "pkgxo --reset"
  }
}
```

## Advanced

### Custom updater

You could use "pkgxo.js" in CWD for overwriting.

```javascript
const pnpmManifest = require('pkgxo/pnpm-manifest')
// pkgxo.js
module.exports = async function (pkg, filename) {
  pkg = await pnpmManifest(pkg, filename)
  pkg.description = `[LOGO]: ${pkg.description || ''}`
  return pkg
}
```

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
