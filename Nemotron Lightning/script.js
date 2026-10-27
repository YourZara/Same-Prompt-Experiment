/*!
 * script.js - Happy Rose Day Web Page
 * Random messages and petal burst animations
 */

/* ---------- Sweet Romantic Messages ---------- */
const messages = [
    "Every rose has its thorn, but you're my favorite exception 🌹",
    "Sending you a garden of roses, one thought at a time 🌷",
    "Roses are red, violets are blue, sugar is sweet, and so are you 💕",
    "You're the rose in my garden, the beat in my heart 🎶",
    "May your day be as beautiful as your smile ❤️",
    "A single rose can be my garden... a single friend can be my world 🌹",
    "Sending virtual petals that never wilt 🌸",
    "Roses fade, but our connection blooms forever 🌿",
    "You blossom with grace and shine with kindness ✨",
    "Love you more than all the roses in the world 💖",
    "Wishing you a day filled with love and petals 🌹",
    "You're the most beautiful rose in every garden 🌺"
];

/* ---------- DOM Elements ---------- */
const messageBox = document.getElementById('messageBox');
const messageText = document.querySelector('.message-text');
const sendButton = document.getElementById('sendButton');
const petalsContainer = document.getElementById('petalsContainer');

/* ---------- Initial Falling Petals (Continuous Animation) ---------- */
function createInitialPetals() {
    // Create a few petals that fall continuously
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
            createFallingPetal();
        }, Math.random() * 2000);
    }
}

/* ---------- Create a Single Falling Petal ---------- */
function createFallingPetal() {
    const petal = document.createElement('div');
    petal.className = 'floating-petal';

    // Random rose colors
    const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#ff6b6b', '#c026d3'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.left = Math.random() * 100 + '%';
    petal.style.background = color;
    petal.style.fontSize = Math.random() * 10 + 10 + 'px';

    // Random fall duration and delay
    const fallDuration = Math.random() * 5 + 6; // 6-11 seconds
    const fallDelay = Math.random() * 3; // 0-3 seconds delay

    petal.style.animation = `fall ${fallDuration}s linear ${fallDelay}s forwards`;
    petalsContainer.appendChild(petal);

    // Remove petal after animation completes
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, (fallDuration + fallDelay) * 1000);
}

/* ---------- Petal Burst on Button Click ---------- */
function burstPetals() {
    // Create a burst of petals
    const burstCount = 20;

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            createFallingPetal();
        }, i * 50); // Stagger the petals
    }
}

/* ---------- Show Random Message ---------- */
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    messageText.textContent = randomMessage;
    messageBox.classList.remove('hidden');
}

/* ---------- Event Listeners ---------- */
sendButton.addEventListener('click', () => {
    showRandomMessage();
    burstPetals();
    // Also create a few extra petals for flair
    setTimeout(() => createFallingPetal(), 200);
    setTimeout(() => createFallingPetal(), 400);
    setTimeout(() => createFallingPetal(), 600);
});

/* ---------- Initialize on Page Load ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // Start initial falling petals
    createInitialPetals();

    // Ensure message box is visible initially (with welcome text)
    messageBox.classList.remove('hidden');
    messageText.textContent = "Click 'Send a Rose' to receive a sweet message 💌";
});