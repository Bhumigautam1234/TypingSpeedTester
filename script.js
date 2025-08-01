const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Typing fast takes practice, and accuracy is more important than speed.",
  "You can always improve by being consistent and focused on your goals.",
  "The journey to success begins with small steps and ends with discipline.",
  "Don't be afraid to make mistakes, they are proof that you're trying."
];

let currentQuote = "";
let startTime = null;
let timerInterval = null;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const statsEl = document.getElementById("stats");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const liveTimeEl = document.getElementById("liveTime");
const errorEl = document.getElementById("error");

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
}

function calculateWPM(text, seconds) {
  const words = text.trim().split(/\s+/).length;
  return Math.round((words / seconds) * 60);
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    liveTimeEl.textContent = elapsed;
  }, 1000);
}

inputEl.addEventListener("keydown", () => {
  if (!startTime) {
    startTimer();
  }
});

submitBtn.addEventListener("click", () => {
  const typedText = inputEl.value.trim();
  const originalText = currentQuote.trim();

  if (!typedText) {
    alert("Please type the sentence before submitting.");
    return;
  }

  if (typedText !== originalText) {
    clearInterval(timerInterval);
    errorEl.textContent = "❌ Typed text does not match the original sentence.";
    errorEl.style.display = "block";
    statsEl.style.display = "none";
    submitBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    inputEl.disabled = true;
    return;
  }

  clearInterval(timerInterval);
  const totalTime = Math.floor((new Date() - startTime) / 1000);
  const wpm = calculateWPM(typedText, totalTime);

  errorEl.style.display = "none";
  timeEl.textContent = totalTime;
  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;

  statsEl.style.display = "block";
  submitBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  inputEl.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = null;
  liveTimeEl.textContent = 0;
  inputEl.value = "";
  inputEl.disabled = false;
  errorEl.style.display = "none";
  statsEl.style.display = "none";
  resetBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
  loadQuote();
});

loadQuote();
