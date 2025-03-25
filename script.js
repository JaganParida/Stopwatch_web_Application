let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector(".display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function updateTime() {
  let currentTime = Date.now() - startTime + elapsedTime;
  let ms = currentTime % 1000;
  let sec = Math.floor((currentTime / 1000) % 60);
  let min = Math.floor((currentTime / 60000) % 60);
  let hrs = Math.floor(currentTime / 3600000);

  display.textContent = `${String(hrs).padStart(2, "0")}:${String(min).padStart(
    2,
    "0"
  )}:${String(sec).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

startPauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    startPauseBtn.style.background = "#28a745";
  } else {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "Pause";
    startPauseBtn.style.background = "#ffc107";
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  startPauseBtn.style.background = "#28a745";
  isRunning = false;
  lapsContainer.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    let lapTime = document.createElement("li");
    lapTime.textContent = display.textContent;
    lapsContainer.appendChild(lapTime);
  }
});
