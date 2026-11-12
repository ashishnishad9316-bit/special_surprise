const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");

openBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  openBtn.textContent = "Surprise Opened 💖";
  openBtn.disabled = true;
  openBtn.style.opacity = "0.75";
  surprise.scrollIntoView({ behavior: "smooth", block: "center" });
  burstHearts();
});

// Original, browser-generated birthday melody. No external song or audio file needed.
let audioContext;
let melodyTimer;
let noteIndex = 0;
let isPlaying = false;
const notes = [523.25, 659.25, 783.99, 659.25, 698.46, 783.99, 880, 783.99,
               659.25, 587.33, 523.25, 587.33, 659.25, 523.25];

function playNote(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function playNextNote() {
  if (!isPlaying) return;
  const now = audioContext.currentTime;
  playNote(notes[noteIndex % notes.length], now, 0.28);
  noteIndex++;
  melodyTimer = setTimeout(playNextNote, 360);
}

async function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    alert("This browser does not support the music feature.");
    return;
  }
  audioContext = audioContext || new AudioContextClass();
  if (audioContext.state === "suspended") await audioContext.resume();
  isPlaying = true;
  musicBtn.classList.add("playing");
  musicBtn.setAttribute("aria-pressed", "true");
  musicBtn.innerHTML = "Ⅱ  Pause birthday tune";
  playNextNote();
}

function stopMusic() {
  isPlaying = false;
  clearTimeout(melodyTimer);
  if (audioContext && audioContext.state === "running") audioContext.suspend();
  musicBtn.classList.remove("playing");
  musicBtn.setAttribute("aria-pressed", "false");
  musicBtn.innerHTML = "♫  Play birthday tune";
}

musicBtn.addEventListener("click", async () => {
  if (isPlaying) stopMusic();
  else await startMusic();
});

function burstHearts() {
  const symbols = ["💗", "💕", "✨", "🌸"];
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");
    heart.textContent = symbols[i % symbols.length];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (16 + Math.random() * 15) + "px";
    heart.style.zIndex = "5";
    heart.style.pointerEvents = "none";
    heart.style.transition = "transform 2.8s ease-out, opacity 2.8s ease-out";
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-${65 + Math.random() * 65}vh) rotate(${Math.random()*80-40}deg)`;
      heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 3000);
  }
}
