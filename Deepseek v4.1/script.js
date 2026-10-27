/* ==========================================================================
   Happy Rose Day — interactions
   1. Spawns soft, randomly drifting rose petals in the background.
   2. On "Send a Rose": shows a new random message and bursts petals
      outward from the button.
   ========================================================================== */

const petalsLayer = document.getElementById("petals");
const messageEl = document.getElementById("message");
const sendButton = document.getElementById("send-rose");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Sweet notes shown when the button is pressed. */
const messages = [
  "Every rose has a story, but mine begins with you.",
  "You make ordinary days feel like a garden in bloom.",
  "If I could, I'd hand you a rose that never fades.",
  "You are the softest thought in my heart.",
  "A thousand roses couldn't say what your smile does.",
  "You bloom in every corner of my mind.",
  "With you, even the thorns feel worth it.",
  "My favourite place is right beside you."
];

let currentMessage = 0;

/* Petal colours: [highlight, deep shade] */
const petalColors = [
  ["#ffc2d1", "#e63956"],
  ["#ffb3c6", "#c9184a"],
  ["#ff8fa3", "#a4133c"],
  ["#ffe0e9", "#ff4d6d"],
  ["#ffd6e0", "#d61f3e"]
];

/* Small helper: random number in a range. */
const random = (min, max) => Math.random() * (max - min) + min;

/* Build one petal shape with a random colour and sway. */
function makePetalShape() {
  const shape = document.createElement("span");
  shape.className = "petal__shape";

  const [light, deep] = petalColors[Math.floor(Math.random() * petalColors.length)];
  shape.style.setProperty("--c1", light);
  shape.style.setProperty("--c2", deep);
  shape.style.setProperty("--sway", `${random(14, 46)}px`);
  shape.style.setProperty("--sway-duration", `${random(3, 6)}s`);
  shape.style.setProperty("--sway-delay", `${random(-6, 0)}s`);

  return shape;
}

/* Create the endless background shower of petals. */
function spawnBackgroundPetals(count) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const duration = random(9, 18);

    petal.style.setProperty("--x", `${random(-2, 102)}vw`);
    petal.style.setProperty("--size", `${random(10, 22)}px`);
    petal.style.setProperty("--fall-duration", `${duration}s`);
    petal.style.setProperty("--fall-delay", `${random(-duration, 0)}s`); // start mid-fall
    petal.style.setProperty("--drift", `${random(-90, 90)}px`);
    petal.style.setProperty("--opacity", random(0.35, 0.8).toFixed(2));
    petal.appendChild(makePetalShape());

    fragment.appendChild(petal);
  }

  petalsLayer.appendChild(fragment);
}

/* Throw a burst of petals out from a point on screen. */
function burstPetals(originX, originY) {
  const count = 16;

  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal petal--burst";

    const angle = (Math.PI * 2 * i) / count + random(-0.25, 0.25);
    const distance = random(60, 170);

    petal.style.setProperty("--x", `${originX}px`);
    petal.style.setProperty("--y", `${originY}px`);
    petal.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    petal.style.setProperty("--ty", `${Math.sin(angle) * distance - 30}px`);
    petal.style.setProperty("--spin", `${random(-360, 360)}deg`);
    petal.style.setProperty("--size", `${random(9, 17)}px`);
    petal.appendChild(makePetalShape());

    document.body.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  }
}

/* Show a random message, never the same one twice in a row. */
function showRandomMessage() {
  let next = Math.floor(Math.random() * messages.length);

  if (messages.length > 1 && next === currentMessage) {
    // Step forward by a random non-zero amount so the note always changes.
    next = (next + 1 + Math.floor(Math.random() * (messages.length - 1))) % messages.length;
  }

  currentMessage = next;
  messageEl.textContent = messages[next];

  // Restart the little fade/pop animation.
  messageEl.classList.remove("message--pop");
  void messageEl.offsetWidth;
  messageEl.classList.add("message--pop");
}

/* Wire up the button. */
sendButton.addEventListener("click", () => {
  const rect = sendButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  showRandomMessage();

  if (!reduceMotion.matches) {
    burstPetals(centerX, centerY);
  }
});

/* Start the background shower (16 petals is plenty and stays smooth). */
spawnBackgroundPetals(16);
