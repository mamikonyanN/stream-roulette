window.addEventListener('resize', calculateSize)
calculateSize()

let eventSource = new EventSource('/event/bar')
eventSource.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data)
    startChain(data)
  } catch (e) {
  }
}

function calculateSize () {
  anime.set('.status', { height: window.innerHeight, width: window.innerWidth, fontSize: window.innerHeight * .5 })
}

function startChain (data) {
  if(data.isWin) {
    anime({
      targets: '.current',
      keyframes: [
        { innerHTML: data.goal, duration: 800, endDelay: 700 },
        { innerHTML: 0, duration: 500 }
      ],
      round: 100,
      easing: 'easeInOutQuad'
    })
    anime({
      targets: '.bar',
      keyframes: [
        { width: '100%', duration: 1500 },
        { opacity: 0, duration: 500 },
        { width: 0, duration: 0 },
        { opacity: 1, duration: 0 }
      ],
      easing: 'easeInOutQuad'
    }).finished.then(() => updateValue(data))
  } else updateValue(data)
}

function updateValue (data) {
  anime({
    targets: '.bar',
    width: (data.current / data.goal) * 100 + '%',
    easing: 'easeInOutQuad'
  })
  anime({
    targets: '.current',
    innerHTML: data.current,
    round: 100,
    easing: 'easeInOutQuad'
  })
}