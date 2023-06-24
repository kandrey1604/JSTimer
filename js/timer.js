const resultInput = document.querySelector(".time");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

let isPaused = false;
let timeInterval;
let pausedTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

const savedTime = sessionStorage.getItem('timerData');
if (savedTime) {
    const parsedTime = JSON.parse(savedTime);
    setInitialTime(parsedTime.hours, parsedTime.minutes, parsedTime.seconds);
}

window.addEventListener("beforeunload", saveTimerData);

function startTimer() {

    let hours = parseTimeInput('#hours');
    let minutes = parseTimeInput('#minutes');
    let seconds = parseTimeInput('#seconds');

    // Установка значений по умолчанию, если не введены часы или минуты
    if (hours === '') {
        hours = 0;
    }
    if (minutes === '') {
        minutes = 0;
    }
    if (seconds === '') {
        seconds = 0;
    }

    timeInterval = setInterval(updateTimer, 1000);
    startButton.textContent = "Started";
    startButton.removeEventListener("click", startTimer);
}

function pauseTimer() {
    clearInterval(timeInterval);
    pausedTime.hours = parseTimeInput('#hours');
    pausedTime.minutes = parseTimeInput('#minutes');
    pausedTime.seconds = parseTimeInput('#seconds');

    sessionStorage.setItem('timerData', JSON.stringify(pausedTime));
}

function resumeTimer() {
    startTimer();   
    setInitialTime(pausedTime.hours, pausedTime.minutes, pausedTime.seconds);
    pausedTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    sessionStorage.removeItem('timerData');

} 

function toggleTimer() {
    if (!isPaused) {
        pauseTimer();
        isPaused = true;
        pauseButton.textContent = "Resume";
    } else {
        resumeTimer();
        isPaused = false;
        pauseButton.textContent = "Pause";
    }
}

function resetTimer() {
    setTimeInputValue('#hours', formatTime(0));
    setTimeInputValue('#minutes', formatTime(0));
    setTimeInputValue('#seconds', formatTime(0));

    startButton.textContent = "Start";
    sessionStorage.removeItem('timerData');
}

function updateTimer() {

    let hours = parseTimeInput('#hours');
    let minutes = parseTimeInput('#minutes');
    let seconds = parseTimeInput('#seconds');

    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
                clearInterval(timeInterval);
                hours = 0;
                minutes = 0;
                seconds = 0;
                return;
            }
        }
    }

    formatAndSetTimeInput('#hours', hours);
    formatAndSetTimeInput('#minutes', minutes);
    formatAndSetTimeInput('#seconds', seconds);

    if (!isPaused && hours === 0 && minutes === 0 && seconds === 0) {
        showMessage("Время вышло!");
    }
}

