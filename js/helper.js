window.showMessage = function(message) {
    alert(message);
}

//преобразование вводимых значений во время
window.parseTimeInput = function(inputId) {
    let inputElement = document.querySelector(inputId)
    //ввод нулей при пустых полях
    let value = inputElement.value || 0;
    //преобразование в число
    return Number(value);
}

//форматирование в 00 вводимого числа
window.formatTime = function(value) {
    return String(value).padStart(2, '0');
}   

//установка значения в поле ввода времени
window.setTimeInputValue = function(selector, value) {
    document.querySelector(selector).value = value;
}

//форматирование и установка времени
window.formatAndSetTimeInput = function(selector, value) {
    const formattedValue = formatTime(value);
    setTimeInputValue(selector, formattedValue);
}

window.setInitialTime = function(hours, minutes, seconds) {
    setTimeInputValue("#hours", formatTime(hours));
    setTimeInputValue("#minutes", formatTime(minutes));
    setTimeInputValue("#seconds", formatTime(seconds));
}

window.saveTimerData = function() {
    const hours = parseTimeInput('#hours');
    const minutes = parseTimeInput('#minutes');
    const seconds = parseTimeInput('#seconds');

    const timerData = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

    sessionStorage.setItem('timerData', JSON.stringify(timerData));
}