let timerInterval = null;
let totalSeconds = 25 * 60;
let isRunning = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const customToggleBtn = document.getElementById('customToggleBtn');
const customBox = document.getElementById('customBox');
const customMinutesInput = document.getElementById('customMinutes');
const applyCustomBtn = document.getElementById('applyCustomBtn');

function updateDisplay() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  minutesEl.textContent = String(mins).padStart(2, '0');
  secondsEl.textContent = String(secs).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.textContent = 'Pause';

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.textContent = 'Start';
      // TODO: optional sound or visual
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startBtn.textContent = 'Start';
  clearInterval(timerInterval);
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener('click', () => {
  pauseTimer();
  totalSeconds = 25 * 60;
  updateDisplay();
});

pomodoroBtn.addEventListener('click', () => {
  pauseTimer();
  totalSeconds = 25 * 60;
  updateDisplay();
});

customToggleBtn.addEventListener('click', () => {
  customBox.classList.toggle('hidden');
  if (!customBox.classList.contains('hidden')) {
    customMinutesInput.focus();
  }
});

applyCustomBtn.addEventListener('click', () => {
  const mins = parseInt(customMinutesInput.value, 10);
  if (!isNaN(mins) && mins > 0 && mins <= 240) {
    pauseTimer();
    totalSeconds = mins * 60;
    updateDisplay();
    localStorage.setItem('cloumi-custom-minutes', String(mins));
    // auto-close after apply
    customBox.classList.add('hidden');
  }
});

(function initCustomFromStorage() {
  const stored = localStorage.getItem('cloumi-custom-minutes');
  if (stored) {
    customMinutesInput.value = stored;
  }
})();

// Background handling
const bgEl = document.getElementById('background');
const bgToggleBtn = document.getElementById('bgToggleBtn');
const bgPicker = document.getElementById('bgPicker');
const bgThumbs = document.querySelectorAll('.bg-thumb');

const BACKGROUNDS = {
  bg1: 'assets/backgrounds/bg1.jpg',
  bg2: 'assets/backgrounds/bg2.jpg',
  bg3: 'assets/backgrounds/bg3.jpg',
  bg4: 'assets/backgrounds/bg4.jpg',
  bg5: 'assets/backgrounds/bg5.jpg',
  bg6: 'assets/backgrounds/bg6.jpg',
  bg7: 'assets/backgrounds/bg7.jpg',
  bg8: 'assets/backgrounds/bg8.jpg'
};

function applyBackground(key) {
  const value = BACKGROUNDS[key];
  if (!value) return;

  bgEl.style.backgroundImage = `url('${value}')`;

  bgThumbs.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.bg === key);
  });

  localStorage.setItem('cloumi-bg', key);
}

bgToggleBtn.addEventListener('click', () => {
  bgPicker.classList.toggle('hidden');
});

bgThumbs.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.bg;
    applyBackground(key);
  });
});

(function initBackgroundFromStorage() {
  const stored = localStorage.getItem('cloumi-bg');
  if (stored && BACKGROUNDS[stored]) {
    applyBackground(stored);
  } else {
    applyBackground('bg1');
  }
})();

// Fullscreen toggle (top-right button)
const fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

updateDisplay();
