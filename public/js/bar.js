window.addEventListener('resize', calculateSize)
calculateSize()
updateValue({ current: 0 })

function test (isWin = true, current = 300, goal = 500) {
  startChain({ isWin, current, goal })
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