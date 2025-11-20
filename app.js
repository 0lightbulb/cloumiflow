
let timerInterval;
let totalSeconds = 25 * 60;

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  document.getElementById('minutes').innerText = String(minutes).padStart(2,'0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2,'0');
}

document.getElementById('startBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  totalSeconds = 25 * 60;
  updateDisplay();
});

function setPomodoro() {
  totalSeconds = 25 * 60;
  updateDisplay();
}

function showCustom() {
  document.getElementById('customBox').classList.toggle('hidden');
}

function applyCustom() {
  const mins = parseInt(document.getElementById('customMinutes').value);
  if (!isNaN(mins)) {
    totalSeconds = mins * 60;
    updateDisplay();
  }
}
updateDisplay();
