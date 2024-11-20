let timerInterval;
let remainingSeconds = 0;

function startCountdownTimer(displayElement, countdownSeconds, onTimerEnd) {
    stopTimer();
    remainingSeconds = countdownSeconds;
    updateTimerDisplay(displayElement); // Display initial time
    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimerDisplay(displayElement);
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            onTimerEnd(); // Trigger callback when time is up
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay(displayElement) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    displayElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export { startCountdownTimer, stopTimer };
