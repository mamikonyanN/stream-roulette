anime.set('.message', { opacity: 0 })

window.addEventListener('resize', calculateSize)
calculateSize()

function calculateSize () {
  anime.set('.message', { width: window.innerWidth })
}

function test (rotateDuration = 0, pause = 2000, task = 'Example task') {
  showMessage({ rotateDuration, pause, task })
}

function showMessage (data) {
  anime.set('.message', { innerHTML: data.task })
  anime({
    targets: '.message',
    delay: data.rotateDuration,
    keyframes: [
      { opacity: 1, duration: 400, endDelay: data.pause - 800 },
      { opacity: 0, duration: 400 }
    ],
    easing: 'easeInOutQuad'
  })
}
