
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.textContent = 'Pause';
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    startTime = 0;
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    lapsList.innerHTML = '';
}

function lapTimer() {
    if (running) {
        laps.push(display.textContent);
        updateLaps();
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.textContent = hours + ':' + minutes + ':' + seconds;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

resetBtn.disabled = true;
lapBtn.disabled = true;
