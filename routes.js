const express = require('express')
const apiRouter = require('./routes/apiRoutes')
const rouletteRouter = require('./routes/rouletteRouter')
const viewRouter = require('./routes/viewRouter')
const appRouter = express.Router()

appRouter.use('/event', rouletteRouter)
appRouter.use('/api', apiRouter)
appRouter.use('/', viewRouter)

module.exports = appRouter