const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const database = low(adapter)

database.defaults({
  // settings
  token: '',
  tasks: [],
  goal: 100,
  // roulette customisation
  rotateDuration: 5000,
  pause: 2000,
  // roulette
  current: 0,
  angle: 0
}).write()

function get (requiredFields = []) {
  return requiredFields.reduce((result, field) => {
    result[field] = database.get(field).value()
    return result
  }, {})
}

function set (data = {}) {
  for (let field in data) database.set(field, data[field]).write()
  return data
}

module.exports = { get, set }
