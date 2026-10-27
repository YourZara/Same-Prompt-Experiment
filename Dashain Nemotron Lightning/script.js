/*
  script.js — Interactive Dashain experiences
  Features:
    - Falling marigold petals & jamara
    - Diya that lights on click
    - Kite / ping moment
    - Tika-and-blessing reveal
    - "Send a Dashain Wish" button → random blessing + petal burst
  No image files: all drawings are inline SVG created / animated in JS.
*/

(() => {
  "use strict";

  // ── Configuration ─────────────────────────────────────────────
  const blessings = [
    "May the light of the diya guide you to new heights. 🪔",
    "Tika and jamara bring you strength and growth each day.",
    "Victory of good over evil — may that truth shine in your life.",
    "Family near, family far — may hearts unite this Dashain.",
    "Kites in the sky, may your wishes fly high and far.",
    "A burst of marigold petals for a day filled with joy.",
    "New beginnings, fresh hope, and prosperity always.",
    "May your life be as vibrant as the festival colors."
  ];

  let currentBlessingIndex = -1;

  // ── DOM elements ──────────────────────────────────────────────
  const diyaWrapper = document.getElementById("diyaWrapper");
  const petalsCanvas = document.getElementById("petalsCanvas");
  const sendWishBtn = document.getElementById("sendWishBtn");
  const storyScenes = document.querySelectorAll(".story-scene");

  // ── 1. Falling petals & jamara canvas ─────────────────────────
  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    // Random shape: marigold or jamara sprout
    if (Math.random() > 0.5) {
      // Marigold petal — jagged oval
      petal.style.width = `${Math.random() * 12 + 8}px`;
      petal.style.height = `${Math.random() * 8 + 5}px`;
      petal.style.background = `linear-gradient(135deg, ${varColor(
        "--marigold"
      )}, ${varColor("--marigold-light")})`;
      petal.style.borderRadius = "30% 30% 70% 70% / 40% 40% 60% 60%";
      petal.style.boxShadow = `2px 2px 0 ${shadeColor(
        "--marigold-light",
        15
      )}`;
    } else {
      // Jamara sprout — narrow leaf shape
      petal.style.width = "6px";
      petal.style.height = `${Math.random() * 15 + 10}px`;
      petal.style.background = `linear-gradient(180deg, #8b5a2b, #6b4210)`;
      petal.style.borderRadius = "2px 2px 6px 6px";
      petal.style.transformOrigin = "bottom center";
    }
    // Random start position
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petal.style.rotation = `${Math.random() * 360}deg`;
    // Random wiggle keyframes will be applied via inline style
    petal.style.setProperty("--rotate", `${Math.random() * 30 - 15}deg`);
    petal.style.setProperty(
      "--wiggle",
      `${Math.random() * 20 - 10}px`
    );
    petalsCanvas.appendChild(petal);

    // Remove after animation
    setTimeout(() => petal.remove(), 5500);
  }

  function varColor(varName) {
    // Simple get-computed-style-like fallback using CSS custom properties
    // We'll use getComputedStyle on documentElement
    const computed = getComputedStyle(document.documentElement);
    return computed.getPropertyValue(varName).trim();
  }

  function shadeColor(varName, percent) {
    // Lighten or darken a bit via CSS (approximate)
    const computed = getComputedStyle(document.documentElement);
    const color = computed.getPropertyValue(varName).trim();
    // Simple approach: add/ subtract a bit using CSS
    return `rgba(0,0,0,0.1)`; // fallback — we'll just use static colors
  }

  // Initialize petals on load
  for (let i = 0; i; i++) {
    // (will be triggered by interaction instead)
  }

  // ── 2. Diya lights up on click ────────────────────────────────
  function initDiya() {
    if (!diyaWrapper) return;

    diyaWrapper.addEventListener("click", () => {
      diyaWrapper.classList.toggle("light");

      if (diyaWrapper.classList.contains("light")) {
        // Add glow effect temporarily
        const circle = diyaWrapper.querySelector("circle");
        if (circle) {
          circle.style.boxShadow = "0 0 30px rgba(255, 183, 130, 0.8)";
          setTimeout(() => {
            circle.style.boxShadow = "";
          }, 1500);
        }
      }
    });
  }

  // ── 3. Kite / ping moment ─────────────────────────────────────
  function initKite() {
    // The kite is already in HTML/SVG — we just add a subtle float
    const kiteScene = document.getElementById("kiteScene");
    if (!kiteScene) return;

    // Create floating effect with CSS animation
    const style = document.createElement("style");
    style.textContent `
      @keyframes float-kite {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .kite-floating {
        animation: float-kite 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    kiteScene.classList.add("kite-floating");
  }

  // ── 4. Tika-and-blessing reveal ───────────────────────────────
  function initTikaReveal() {
    // When "Send a Dashain Wish" is clicked, show a random blessing
    // and animate a tika appearance
    const tikaContainer = document.createElement("div");
    tikaContainer.className = "tika-reveal";
    tikaContainer.innerHTML = `
      <svg viewBox="0 0 100 80" width="100" height="80" style="margin: 2rem auto;">
        <circle cx="50" cy="50" r="30" fill="#ffe082" stroke="#b71c1c" stroke-width="2"/>
        <path d="M 50 30 Q 50 10 70 30 Q 80 50 70 70 Q 50 80 30 70 Q 20 50 30 30 Z"
          fill="#6b4210"/>
        <text x="50" y="55" text-anchor="middle" font-size="12" fill="#2d1b10">Tika</text>
      </svg>
      <p class="blessing-text" style="text-align: center; max-width: 90%; margin: 1rem auto; font-style: italic; color: var(--crimson);"></p>
    `;
    // Insert after kite scene or somewhere visible
    const kiteScene = document.getElementById("kiteScene");
    if (kiteScene) {
      kiteScene.parentNode.insertBefore(tikaContainer, kiteScene.nextSibling);
    }
  }

  // ── 5. Send a Dashain Wish button ─────────────────────────────
  function initSendWishButton() {
    if (!sendWishBtn) return;

    sendWishBtn.addEventListener("click", () => {
      // Pick a random blessing different from current
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * blessings.length);
      } while (randomIndex === currentBlessingIndex && blessings.length > 1);

      currentBlessingIndex = randomIndex;

      // Update blessing text (we'll insert it into the tika reveal)
      const blessingTextEl = document.querySelector(".blessing-text");
      if (blessingTextEl) {
        blessingTextEl.textContent = blessings[randomIndex];
      }

      // Trigger petal burst
      triggerPetalBurst();

      // Also show a quick diya light if not already lit
      if (!diyaWrapper.classList.contains("light")) {
        diyaWrapper.classList.add("light");
        setTimeout(() => diyaWrapper.classList.remove("light"), 500);
      }
    });
  }

  // ── Petal burst function ──────────────────────────────────────
  function triggerPetalBurst() {
    // Clear existing petals
    const existing = petalsCanvas.querySelectorAll(".petal");
    existing.forEach(p => p.remove());

    // Create a burst of 30 petals
    for (let i = 0; i < 30; i++) {
      setTimeout(createPetal, i * 50);
    }
  }

  // ── Initialize everything ─────────────────────────────────────
  function init() {
    initDiya();
    initKite();
    initTikaReveal();
    initSendWishButton();

    // Initial petal sprinkle on load (gentle, not overwhelming)
    for (let i = 0; i < 10; i++) {
      setTimeout(createPetal, i * 200);
    }
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();