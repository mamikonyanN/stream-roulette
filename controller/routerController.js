const io = require('socket.io-client')
const database = require('../config/database')
const EventEmitter = require('events')
const Stream = new EventEmitter()
const EVENT_HEADER = { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' }

const socket = io(
  'wss://socket11.donationalerts.ru:443',
  { reconnection: true, reconnectionDelayMax: 5000, reconnectionDelay: 1000 }
)
socket.on('connect', () => socket.emit('add-user', { ...database.get([ 'token' ]), type: 'alert_widget' }))
socket.on('donation', donation)

function donation (message) {
  const { amount_main: amount, username: author } = parseJson(message)
  let { current, goal } = database.get([ 'current', 'goal' ])
  const donateAmount = Number(amount)
  const sum = donateAmount + current
  const isWin = sum >= goal

  current = sum % goal
  database.set({ current })

  Stream.emit('statusSend', { goal, current, isWin })

  if(isWin) spinRoulette(author)
}

function parseJson (message) {
  try {
    return JSON.parse(message)
  } catch (e) {
    return null
  }
}

function spinRoulette (author = 'random_nick__') {
  const { angle: startAngle, tasks, rotateDuration, pause } = database.get([ 'angle', 'tasks', 'rotateDuration', 'pause' ])
  const tasksLength = tasks.length
  const index = randomInt(0, tasksLength - 1)
  const endAngle = calculateEndAngle(tasksLength, index)
  const task = tasks[index] || 'Example task'
  Stream.emit('rouletteSend', { startAngle, endAngle, rotateDuration, pause, tasksLength, task, author })
  database.set({ angle: endAngle % 360 })
}

function calculateEndAngle (tasksLength, index) {
  const MIN_TURN = 5
  const MAX_TURN = 10
  const angle = 360 / tasksLength
  return (randomInt(MIN_TURN, MAX_TURN) * 360) - randomInt((angle * index) - (angle / 2), (angle * index) + (angle / 2) - 1)
}

function randomInt (min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function rouletteEvent (request, response) {
  response.set(EVENT_HEADER)
  Stream.on('rouletteSend', function (data) {
    response.write(`retry: 5000\n`)
    response.write(`event: message\n`)
    response.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

function barEvent (request, response) {
  response.set(EVENT_HEADER)

  response.write(`retry: 5000\n`)
  response.write(`event: message\n`)
  response.write(`data: ${JSON.stringify(database.get([ 'goal', 'current' ]))}\n\n`)

  Stream.on('statusSend', function (data) {
    response.write(`event: message\n`)
    response.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

function messageEvent (request, response) {
  response.set(EVENT_HEADER)
  Stream.on('messageSend', function (data) {
    response.write(`retry: 5000\n`)
    response.write(`event: message\n`)
    response.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}

function showMessage (request, response) {
  Stream.emit('messageSend', request.body)
  response.sendStatus(200)
}

module.exports = { rouletteEvent, messageEvent, barEvent, showMessage }