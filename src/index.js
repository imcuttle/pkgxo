/**
 * lets you can update package.json when publish
 * @author imcuttle
 */
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const cloneDeep = require('lodash.clonedeep')
const isEq = require('lodash.isequal')

const DB_PATH = require.resolve('../db.json')

async function readDb() {
  const content = await promisify(fs.readFile.bind(fs))(DB_PATH, 'utf-8')
  return JSON.parse(content)
}

async function readPkg(dir) {
  const content = await promisify(fs.readFile.bind(fs))(path.join(dir, 'package.json'), 'utf-8')
  return JSON.parse(content)
}

async function writePkg(dir, data) {
  await promisify(fs.writeFile.bind(fs))(
    path.join(dir, 'package.json'),
    JSON.stringify(data, null, await getIndent(dir)),
    'utf-8'
  )
}

async function updateDbAndSave(fn) {
  const db = await readDb()
  const updatedDB = fn(db)
  await promisify(fs.writeFile.bind(fs))(DB_PATH, JSON.stringify(updatedDB, null, 2))
}

async function getIndent(dir) {
  // Pkg path
  try {
    // Read pkg
    let data = await readPkg(dir)
    const regex = /^[ ]+|\t+/m
    const res = regex.exec(data)
    return res ? res[0] : 2
  } catch (e) {
    return 2
  }
}

async function submitAndSave(fn, dir = process.cwd()) {
  const pkg = await readPkg(dir)
  const pkgCloned = cloneDeep(pkg)
  const prevPkgKeys = Object.keys(pkg)
  const tmpNewPkg = (await fn(pkgCloned, path.join(dir, 'package.json'))) || {}

  const newPkg = {}
  prevPkgKeys.forEach((name) => {
    if (!newPkg.hasOwnProperty(name)) {
      newPkg[name] = tmpNewPkg.hasOwnProperty(name) ? tmpNewPkg[name] : pkg[name]
    }
  })
  Object.keys(tmpNewPkg).forEach((name) => {
    if (!newPkg.hasOwnProperty(name)) {
      newPkg[name] = tmpNewPkg[name]
    }
  })

  await updateDbAndSave((db) => {
    db[dir] = pkg
    return db
  })
  if (!isEq(newPkg, pkg)) {
    await writePkg(dir, newPkg)
  }
}

async function resetAndSave(dir = process.cwd()) {
  const pkg = await readPkg(dir)
  const db = await readDb()
  if (db[dir]) {
    if (!isEq(db[dir], pkg)) {
      await writePkg(dir, db[dir])
    }
  }
}

async function clearAndSave(dir = process.cwd()) {
  await updateDbAndSave((db) => {
    delete db[dir]
    return db
  })
}

module.exports = {
  clearAndSave,
  submitAndSave,
  resetAndSave,
  readDb,
  readPkg,
  writePkg,
  updateDbAndSave
}
