/* ============================================================
   Happy Rose Day — Behavior
   - Random sweet messages on button click
   - Continuous soft falling petals in the background
   - Burst of petals when "Send a Rose" is clicked
   ============================================================ */

// Sweet messages shown when the user clicks "Send a Rose"
const messages = [
  "You make every day bloom a little brighter. 🌹",
  "My heart beats a little faster when you're near. ❤️",
  "Every moment with you is petal-perfect. 🌷",
  "You're the rose in the garden of my life. 🌹",
  "Sending you a thousand rose-scented hugs. 🤗",
  "If love were a flower, it would look like you. 💖",
  "You turn ordinary days into something beautiful. ✨",
  "Just like a rose, you're rare and wonderful. 🌺",
  "My favorite place is right beside you. 🌷",
  "Roses are red, violets are blue — you're the sweetest thing I knew. 💕",
];

// DOM references
const messageEl = document.getElementById("message");
const btn = document.getElementById("roseBtn");
const petalsContainer = document.getElementById("petals");

// Pick a random message from the list
function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Show a new random sweet message with a subtle fade
function sendRoseMessage() {
  const next = getRandomMessage();
  messageEl.style.opacity = "0";
  setTimeout(() => {
    messageEl.textContent = next;
    messageEl.style.opacity = "1";
  }, 180);
  spawnPetalBurst(24);
}

// Create one falling petal element
function createPetal({ left, duration, sizeClass, delay = 0 }) {
  const petal = document.createElement("div");
  petal.className = `petal ${sizeClass}`;
  petal.style.left = `${left}%`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
  return petal;
}

// Continuous soft rain of petals in the background
function startFallingPetals() {
  const spawn = () => {
    const width = window.innerWidth;
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 8; // 6–14 seconds
    const roll = Math.random();
    const sizeClass = roll < 0.33 ? "small" : roll < 0.66 ? "medium" : "large";

    const petal = createPetal({ left, duration, sizeClass });
    petalsContainer.appendChild(petal);

    // Remove the petal after its animation finishes so DOM stays clean
    petal.addEventListener("animationend", () => petal.remove());
  };

  // Spawn a new petal at a gentle interval
  const interval = setInterval(spawn, 220);

  // Cleanup if the page is ever unloaded (harmless here, keeps it tidy)
  window.addEventListener("beforeunload", () => clearInterval(interval));
}

// Burst of petals from the bottom center when the button is clicked
function spawnPetalBurst(count = 24) {
  const centerX = window.innerWidth / 2;
  const bottomY = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = `petal ${i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}`;

    // Start near the bottom center, spread outward randomly
    const startX = centerX + (Math.random() - 0.5) * 140;
    petal.style.left = `${Math.max(0, Math.min(100, (startX / window.innerWidth) * 100))}%`;
    petal.style.top = `${bottomY - 20}px`;

    // Faster, shorter fall for a burst effect
    const duration = 1.2 + Math.random() * 1.4;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${Math.random() * 0.6}s`;

    petalsContainer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }
}

// Wire up the button
btn.addEventListener("click", sendRoseMessage);

// Start the soft background petal rain
startFallingPetals();
