const keyboard = document.getElementById("keyboard");

const NOTES = [
  { white: "C", black: "C#" },
  { white: "D", black: "D#" },
  { white: "E", black: null },
  { white: "F", black: "F#" },
  { white: "G", black: "G#" },
  { white: "A", black: "A#" },
  { white: "B", black: null }
];

// EXACT keyboard layout (27 keys total)
const WHITE_KEYS = [
  "a", "s", "d", "f", "g", "h", "j",
  "k", "l", ";", "'",
  "z", "x", "c", "v"
];

const BLACK_KEYS = [
  "w", "e",
  "t", "y", "u",
  "o", "p",
  "[", "]",
  "1", "2", "3"
];

const WHITE_WIDTH = 60;
const BLACK_WIDTH = 40;

let audioIndex = 28;
let whiteIndex = 0;
let whiteKeyCounter = 0;
let blackKeyCounter = 0;

const keyMap = {};

function playSound(num) {
  const audio = new Audio(`audio/${num}.mp3`);
  audio.currentTime = 0;
  audio.play();
}

function pressKey(el, audioNum) {
  el.classList.add('active');
  playSound(audioNum);
  setTimeout(() => {
    el.classList.remove('active');
  }, 150);
}

while (audioIndex <= 45) {
  for (let i = 0; i < NOTES.length && audioIndex <= 45; i++) {
    const note = NOTES[i];
    const white = document.createElement("div");
    white.className = "white-key";

    const whiteAudio = audioIndex;
    const whiteKeyChar = WHITE_KEYS[whiteKeyCounter];

    white.innerHTML = `${note.white}<br><small>${whiteKeyChar?.toUpperCase() || ""}</small>`;

    if (whiteKeyChar) {
      keyMap[whiteKeyChar] = { el: white, audio: whiteAudio };
      white.addEventListener("click", () => pressKey(white, whiteAudio));
    }

    keyboard.appendChild(white);
    audioIndex++;
    whiteKeyCounter++;
    whiteIndex++;
    if (note.black && audioIndex <= 45) {
      const black = document.createElement("div");
      black.className = "black-key";

      const blackAudio = audioIndex;
      const blackKeyChar = BLACK_KEYS[blackKeyCounter];

      black.innerHTML = `${note.black}<br><small>${blackKeyChar?.toUpperCase() || ""}</small>`;

      const left =
        (whiteIndex - 1) * WHITE_WIDTH + WHITE_WIDTH - BLACK_WIDTH / 2;
      black.style.left = `${left}px`;

      if (blackKeyChar) {
        keyMap[blackKeyChar] = { el: black, audio: blackAudio };
        black.addEventListener("click", () => pressKey(black, blackAudio));
      }

      keyboard.appendChild(black);
      audioIndex++;
      blackKeyCounter++;
    }
  }
}
document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if (keyMap[key]) {
    const { el, audio } = keyMap[key];
    pressKey(el, audio);
  }
});
