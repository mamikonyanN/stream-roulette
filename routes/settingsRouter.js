const express = require('express')
const settingsController = require('../controller/settingsController')
const settingsRouter = express.Router()

settingsRouter.get('/', settingsController.getSettings)
settingsRouter.post('/', settingsController.saveSettings)

module.exports = settingsRouter