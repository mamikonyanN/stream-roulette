anime.set('.message', { opacity: 0 })

window.addEventListener('resize', calculateSize)
calculateSize()

let eventSource = new EventSource('/event/message')
eventSource.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data)
    showMessage(data)
  } catch (e) {
  }
}

function calculateSize () {
  anime.set('.message', { width: window.innerWidth })
}

function showMessage (data) {
  anime.set('.message', { innerHTML: data.task })
  anime({
    targets: '.message',
    delay: data.rotateDuration,
    keyframes: [
      { opacity: 1, duration: 400, endDelay: data.pause - 400 },
      { opacity: 0, duration: 1000 }
    ],
    easing: 'easeInOutQuad'
  })
}
