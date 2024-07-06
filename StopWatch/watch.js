let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
        startPauseBtn.textContent = "Pause";
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.textContent = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00.000";
    startPauseBtn.textContent = "Start";
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function lap() {
    {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
