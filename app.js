startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board')
let time = 1;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up');
        startGame()

    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('target')) {
        score++
        event.target.remove()
        createRandomTarget()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomTarget()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove();
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomTarget() {
    const target = document.createElement('div')
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    target.classList.add('target')
    target.style.width = `${size}px`;
    target.style.height = `${size}px`;
    target.style.top = `${y}px`
    target.style.left = `${x}px`

    board.append(target)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}