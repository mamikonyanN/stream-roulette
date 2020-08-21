const wheel = document.querySelector('.wheel')
const animationQueue = []
let diameter = 500

anime.set('.wrapper', { opacity: 0 })

function test (actionsLength = 5, startAngle = 0, endAngle = (360 * 5) + 240, rotateDuration = 5000, pause = 2000) {
  rotate({ actionsLength, startAngle, endAngle, rotateDuration, pause })
}

window.addEventListener('resize', calculateSize)
calculateSize()

function calculateSize () {
  diameter = Math.min(window.innerHeight, window.innerWidth)
  anime.set('.wrapper', { height: diameter, width: diameter })
}

function rotate (data) {
  animationQueue.push(data)
  if(!!anime.running.length) return
  printActions(data.actionsLength)
  anime.set('.wheel', { rotate: data.startAngle })
  appear()
}

async function spin (data) {
  await anime({
    targets: '.wheel',
    rotate: [ data.startAngle, data.endAngle ],
    duration: data.rotateDuration,
    endDelay: data.pause,
    easing: 'cubicBezier(.3, 0, .1, 1)',
    begin: () => printActions(data.actionsLength)
  }).finished
  if(animationQueue.length) await spin(animationQueue.shift())
  else await disappear()
}

async function appear () {
  await anime({
    targets: '.wrapper',
    opacity: { value: 1, duration: 1000 },
    easing: 'linear'
  }).finished
  await spin(animationQueue.shift())
}

async function disappear () {
  await anime({
    targets: '.wrapper',
    opacity: { value: 0, duration: 1000 },
    easing: 'linear'
  }).finished
  if(animationQueue.length) await appear()
}


function printActions (actionsLength) {
  wheel.innerHTML = ''

  const radius = diameter / 2
  const angle = 360 / actionsLength

  for (let index = 0; index < actionsLength; index++) {
    wheel.appendChild(createTaskTitle({ radius, angle, index }))
    if(actionsLength !== 1)
      wheel.appendChild(createBorder({ radius, angle, index }))
  }
}

function createTaskTitle ({ radius, index, angle }) {
  let p = document.createElement('p')
  p.classList.add('number')
  p.style.height = `${radius}px`
  p.style.paddingTop = `${radius / 10}px`
  p.innerHTML = index + 1
  p.style.transform = `rotate(${angle * index}deg) translateX(-50%)`
  return p
}

function createBorder ({ radius, angle, index }) {
  let div = document.createElement('div')
  div.classList.add('border')
  div.style.height = `${radius}px`
  div.style.transform = `rotate(${(angle * index) + angle / 2}deg) translate(-50%)`
  return div
}