const database = require('../config/database')

exports.getSettings = (request, response) => response.send(database.get([ 'token', 'goal', 'tasks' ]))
exports.saveSettings = (request, response) => response.send(database.set(request.body))