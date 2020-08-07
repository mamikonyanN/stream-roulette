const express = require('express')
const settingsRouter = require('./settingsRouter')
const apiRouter = express.Router()

apiRouter.use('/settings', settingsRouter)

module.exports = apiRouter