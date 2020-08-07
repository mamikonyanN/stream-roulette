const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

const appRouter = require('./routes.js')

app.use(bodyParser.json())
app.use(express.static('./public'))
app.use(express.static('./views'))

app.use(appRouter)

app.listen(PORT)
