/* ============================================================
   Happy Rose Day — script.js
   1) Keeps a soft field of falling petals drifting down.
   2) On "Send a Rose": swap in a random sweet message
      and burst a handful of petals from the button.
   No libraries, no network, works from file://.
   ============================================================ */

// ---------- Sweet messages shown after the first one ----------
const MESSAGES = [
  "Roses are red, violets are blue, every day with you feels like Rose Day too. 🌹",
  "If I had a rose for every time I thought of you, I'd be walking through a garden forever. 🌹",
  "You're the rose in my garden and the reason it blooms. 🌹",
  "A rose may wilt, but what I feel for you never will. 🌹",
  "One rose, one smile, one you — that's all my heart ever asks for. 🌹",
  "Some hearts speak in words. Yours speaks in petals. 🌹",
  "The world calls it Rose Day. I call it one more day of loving you. 🌹",
];

// ---------- Element handles ----------
const petalField = document.getElementById("petalField");
const sendBtn    = document.getElementById("sendBtn");
const messageEl  = document.getElementById("message");

// Tracks which messages have been shown so we never repeat back-to-back.
let seenMessages = new Set([0]); // 0 = the initial headline message

// ---------- Helpers ----------

/** Random integer in [min, max] inclusive. */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Create one petal and attach it to the field.
 * @param {boolean} isBurst - false = gentle background petal,
 *                            true  = one-off petal from the button burst.
 */
function makePetal(isBurst) {
  const petal = document.createElement("span");
  petal.className = "petal" + (isBurst ? " burst" : "");

  // Spread petals across the screen (burst petals cluster near the button).
  const left = isBurst
    ? randomInt(30, 70)                       // around screen middle
    : randomInt(0, 100);                      // anywhere along the top

  petal.style.left = left + "vw";

  // Vary size and speed so the fall looks natural, not mechanical.
  const size = isBurst ? randomInt(10, 20) : randomInt(12, 20);
  petal.style.width  = size + "px";
  petal.style.height = size + 4 + "px";

  // Slight per-petal delay/duration jitter (CSS animations apply).
  const delay = isBurst ? Math.random() * 0.15 : Math.random() * 8;
  petal.style.animationDelay = `${delay}s, ${delay}s, ${delay}s`;

  // Random petal tint: pink / soft pink / rose red.
  const tints = ["#ffc2d1", "#ef5b7b", "#e58ba3"];
  petal.style.background = tints[randomInt(0, tints.length - 1)];

  petalField.appendChild(petal);

  // Burst petals fall once — remove them only after the fall animation ends
  // (sway and spin also fire animationend, but happen earlier).
  if (isBurst) {
    petal.addEventListener("animationend", (event) => {
      if (event.animationName === "burst-fall") petal.remove();
    });
  }
  return petal;
}

/** Pick a sweet message different from everything shown before. */
function nextMessage() {
  let index;
  do {
    index = randomInt(0, MESSAGES.length - 1);
  } while (seenMessages.has(index));

  seenMessages.add(index);
  if (seenMessages.size === MESSAGES.length) {
    seenMessages = new Set([index]); // all shown — start a fresh cycle
  }
  return MESSAGES[index];
}

/** Swap the message text with a small fade-in. */
function showMessage(text) {
  messageEl.classList.remove("swap");
  void messageEl.offsetWidth;        // force reflow so the animation restarts
  messageEl.textContent = text;
  messageEl.classList.add("swap");
}

/** Burst a handful of petals near the button. */
function burstPetals() {
  const count = randomInt(8, 14);
  for (let i = 0; i < count; i++) makePetal(true);
}

// ---------- Wire up ----------

// Ambient background petals: a modest number keeps phones smooth.
for (let i = 0; i < 22; i++) makePetal(false);

sendBtn.addEventListener("click", () => {
  showMessage(nextMessage());
  burstPetals();
});
