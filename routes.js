const express = require('express')
const apiRouter = require('./routes/apiRoutes')
const viewRouter = require('./routes/viewRouter')
const appRouter = express.Router()

appRouter.use('/api', apiRouter)
appRouter.use('/', viewRouter)

module.exports = appRouter