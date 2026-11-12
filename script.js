const wishBtn = document.getElementById("wishBtn");
const wishCard = document.getElementById("wishCard");
wishBtn.addEventListener("click", () => {
  wishCard.hidden = !wishCard.hidden;
  wishBtn.textContent = wishCard.hidden ? "🌼 शुभकामनाएँ पढ़ें" : "💛 शुभकामनाएँ छुपाएँ";
});

const audio = document.getElementById("chhathAudio");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicBtn.textContent = "♫ संगीत बंद करें";
    } catch (e) {
      musicBtn.textContent = "MP3 फ़ाइल जोड़ें";
    }
  } else {
    audio.pause();
    musicBtn.textContent = "♫ संगीत चालू करें";
  }
});
