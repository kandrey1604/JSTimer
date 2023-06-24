const stopwatchResult = document.querySelector('#stopwatch');
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

let hours = 0;
let minutes = 0;
let seconds = 0;
let intervalId = null;
let isPaused = false;
let pausedTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", toggleStopwatch);
resetButton.addEventListener("click", resetStopwatch);

function startStopwatch() {
    clearInterval(intervalId);
    startButton.textContent = "Started";
    intervalId = setInterval(updateStopwatch, 1000);
}

function pauseStopwatch() {
    clearInterval(intervalId);
    pausedTime.hours = hours;
    pausedTime.minutes = minutes;
    pausedTime.seconds = seconds;
}

function resumeStopwatch() {
    startStopwatch();   
    hours = pausedTime.hours;
    minutes = pausedTime.minutes;
    seconds = pausedTime.seconds;
    pausedTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
}

function resetStopwatch() {
    clearInterval(intervalId);
    hours = 0;
    minutes = 0;
    seconds = 0;
    pausedTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    isPaused = false;
    startButton.textContent = "Start";
    stopwatchResult.textContent = "00:00:00";
}

function toggleStopwatch() {
    if (!isPaused) {
        pauseStopwatch();
        isPaused = true;
        pauseButton.textContent = "Resume";
    } else {
        resumeStopwatch();
        isPaused = false;
        pauseButton.textContent = "Pause";
    }
}

function updateStopwatch() {
    seconds++
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    } if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    var formattedTime = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    stopwatchResult.textContent = formattedTime;

    // Сохранение значений в sessionStorage
    sessionStorage.setItem("hours", hours);
    sessionStorage.setItem("minutes", minutes);
    sessionStorage.setItem("seconds", seconds);
}

// Восстановление значений из sessionStorage
if (sessionStorage.getItem("hours")) {
    hours = parseInt(sessionStorage.getItem("hours"));
}
if (sessionStorage.getItem("minutes")) {
    minutes = parseInt(sessionStorage.getItem("minutes"));
}
if (sessionStorage.getItem("seconds")) {
    seconds = parseInt(sessionStorage.getItem("seconds"));
}
var formattedTime = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
stopwatchResult.textContent = formattedTime;


