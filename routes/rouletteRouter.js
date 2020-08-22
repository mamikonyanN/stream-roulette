const express = require('express')
const routerController = require('../controller/routerController')
const rouletteRouter = express.Router()

rouletteRouter.get('/wheel', routerController.rouletteEvent)
rouletteRouter.get('/message', routerController.messageEvent)
rouletteRouter.get('/bar', routerController.barEvent)

rouletteRouter.post('/message', routerController.showMessage)

module.exports = rouletteRouter