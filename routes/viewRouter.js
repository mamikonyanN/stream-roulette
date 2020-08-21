const express = require('express')
const viewRoutes = express.Router()

viewRoutes.get('/settings', (request, response) => response.sendFile('settings.html', { root: './views' }))
viewRoutes.get('/wheel', (request, response) => response.sendFile('wheel.html', { root: './views' }))
viewRoutes.get('/bar', (request, response) => response.sendFile('bar.html', { root: './views' }))
viewRoutes.get('/message', (request, response) => response.sendFile('message.html', { root: './views' }))

viewRoutes.use((request, response) => response.status(404).send('Not Found'))

module.exports = viewRoutes