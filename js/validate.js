const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");

hoursInput.addEventListener("input", validateInput);
minutesInput.addEventListener("input", validateInput);
secondsInput.addEventListener("input", validateInput);

function validateInput(event) {
  const input = event.target;
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  let value = parseInt(input.value);

  if (isNaN(value) || value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  }

  input.value = value;
}
