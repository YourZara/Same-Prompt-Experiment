/* =========================================================================
   Happy Dashain — script.js
   
   Interactive behaviours (all graphics are canvas or inline SVG — no image
   files are used):
     1. Continuous falling marigold petals & jamara (canvas particle system)
     2. Clickable/tappable diya that lights up
     3. Story told scene by scene (meaning of Dashain)
     4. Tika-and-blessing reveal
     5. "Send a Dashain Wish" button: new random blessing + petal burst
   ========================================================================= */

(function () {
  "use strict";

  // ------------------------------------------------------------------
  // Content
  // ------------------------------------------------------------------

  // Random blessings shown by the "Send a Dashain Wish" button.
  // "{name}" is replaced with the recipient's name.
  const BLESSINGS = [
    "May Goddess Durga bless you with strength, courage, and victory in all you do. Happy Dashain, {name}! 🪔",
    "May this Dashain fill your home with new joy, prosperity, and the warmth of loved ones. 🌾✨",
    "Wishing you a Vijaya Dashami glowing with light, love, and fresh beginnings, {name}. 🪔💛",
    "May your elders' blessings guide you, and may jamara bring growth to every dream you hold. 🌿",
    "Good over evil, light over darkness — may every day of yours feel like Vijaya Dashami, {name}. 🪔🔥",
    "May your home echo with laughter, your heart with gratitude, and your life with Dashain blessings. 🎉",
  ];

  // Story told across five scenes. Each scene carries part of the meaning
  // of Dashain: victory over evil, jamara, tika, togetherness, lasting light.
  const SCENES = [
    {
      title: "The Victory of Good Over Evil",
      text: "Long ago, the demon Mahishasura spread fear across heaven and earth. The gods combined their power and created Goddess Durga — radiant, fearless, riding a lion. For nine nights they battled, and on the tenth day — <strong>Vijaya Dashami</strong> — good triumphed over evil. Dashain celebrates the light within us conquering the darkness.",
    },
    {
      title: "Jamara — The Seed of New Life",
      text: "Before the festival, families sow maize and barley seeds in a dark corner of the home. By the tenth day they sprout into golden grass called <strong>jamara</strong>. A living promise: from small seeds, with care and time, grows prosperity and new beginnings.",
    },
    {
      title: "Tika — The Elder's Blessing",
      text: "On Vijaya Dashami, elders mix rice, yogurt, and vermilion into <strong>tika</strong>, place it on the foreheads of their loved ones, and tuck jamara behind their ears. It is more than a mark — it is a blessing of long life, strength, protection, and love passed from generation to generation.",
    },
    {
      title: "Kites, Swings & Togetherness",
      text: "Skies fill with kites, bamboo swings (<strong>ping</strong>) creak with laughter, homes wear new clothes, and families gather for feasts. Old disagreements are forgiven, doors open to guests, and the whole country celebrates as one big family.",
    },
    {
      title: "A Light That Stays With You",
      text: "Like a diya that keeps burning through the night, may the spirit of Dashain stay with you — Durga's courage, the harvest's joy, and the warmth of blessings from those who love you.",
    },
  ];

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  let currentScene = 0;
  let diyaLit = false;
  let tikaApplied = false;

  // ------------------------------------------------------------------
  // Canvas: falling marigold petals & jamara
  // ------------------------------------------------------------------
  const canvas = document.getElementById("fallCanvas");
  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  const particles = [];
  const PARTICLE_COUNT = 28;

  const PETAL_COLOURS = ["#b91c1c", "#7f1d1d", "#f59e0b", "#fdba74", "#d4af37"];
  const JAMARA_COLOUR = "#84cc16";

  function resizeCanvas() {
    // Fixed-position canvas covers the viewport.
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
      // Scatter through the screen at start so it isn't empty on load.
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height; // start above the viewport
      this.vx = (Math.random() - 0.5) * 0.7; // gentle sideways drift
      this.vy = 1.1 + Math.random() * 1.8; // fall speed
      this.type = Math.random() < 0.8 ? "petal" : "jamara";
      this.size = this.type === "petal" ? 4 + Math.random() * 5 : 2.5 + Math.random() * 3;
      this.colour =
        this.type === "petal"
          ? PETAL_COLOURS[Math.floor(Math.random() * PETAL_COLOURS.length)]
          : JAMARA_COLOUR;
      this.rotation = Math.random() * Math.PI * 2;
      this.vRotation = (Math.random() - 0.5) * 0.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.02 + Math.random() * 0.05;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.vRotation;
      this.wobble += this.wobbleSpeed;
      // Gentle side-to-side sway as they fall
      this.x += Math.sin(this.wobble) * 0.4;

      if (this.y > height + 25 || this.x < -35 || this.x > width + 35) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      // Soft shimmer
      ctx.globalAlpha = 0.7 + 0.3 * Math.sin(this.wobble);
      ctx.fillStyle = this.colour;

      if (this.type === "petal") {
        // Simple five-petal marigold-ish shape
        const reach = this.size * 0.85;
        const depth = this.size * 0.95;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, -reach, depth, 0, Math.PI);
          ctx.fill();
          ctx.rotate((Math.PI * 2) / 5);
        }
      } else {
        // Jamara sprig: thin stem with a seed head
        ctx.fillRect(-0.8, 0, 1.6, this.size * 3.5);
        ctx.beginPath();
        ctx.arc(0, -this.size * 0.7, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function initParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  // ------------------------------------------------------------------
  // Celebration burst of petals (triggered by button / diya / tika)
  // ------------------------------------------------------------------
  function burstPetals(cx, cy, count = 24) {
    const colours = ["#b91c1c", "#7f1d1d", "#f59e0b", "#fdba74", "#d4af37"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "burst";
      p.style.background = colours[Math.floor(Math.random() * colours.length)];

      const angle = Math.random() * Math.PI * 2;
      const dist = 55 + Math.random() * 150;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 25; // slight upward bias

      p.style.left = cx + "px";
      p.style.top = cy + "px";
      p.style.setProperty("--tx", tx + "px");
      p.style.setProperty("--ty", ty + "px");

      document.body.appendChild(p);

      // Start the transition on the next frame
      requestAnimationFrame(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        p.style.opacity = "0";
      });

      setTimeout(() => p.remove(), 850);
    }
  }

  // ------------------------------------------------------------------
  // Screen navigation
  // ------------------------------------------------------------------
  const screens = document.querySelectorAll("#app > section.screen");

  function showScreen(id) {
    for (const s of screens) {
      s.classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
  }

  // ------------------------------------------------------------------
  // Hero diya: click / tap / keyboard to light it
  // ------------------------------------------------------------------
  const diyaWrap = document.getElementById("diyaWrap");
  const flame = document.getElementById("flame");
  const diyaHint = document.getElementById("diyaHint");

  function toggleDiya() {
    diyaLit = !diyaLit;
    diyaWrap.classList.toggle("lit", diyaLit);
    diyaWrap.setAttribute("aria-pressed", String(diyaLit));
    diyaHint.textContent = diyaLit ? "The diya is lit ✨" : "Tap to light the diya 🪔";
    if (diyaLit) {
      const rect = diyaWrap.getBoundingClientRect();
      burstPetals(rect.left + rect.width / 2, rect.top, 14);
    }
  }

  diyaWrap.addEventListener("click", toggleDiya);
  diyaWrap.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDiya();
    }
  });

  // ------------------------------------------------------------------
  // Story: scene-by-scene navigation
  // ------------------------------------------------------------------
  const sceneEls = document.querySelectorAll(".scene");
  const sceneCountEl = document.getElementById("sceneCount");
  const sceneTotalEl = document.getElementById("sceneTotal");
  const nextSceneBtn = document.getElementById("nextSceneBtn");
  const enterBtn = document.getElementById("enterBtn");

  function renderScene(index) {
    for (const [i, el] of sceneEls.entries()) {
      el.classList.toggle("active", i === index);
    }
    sceneCountEl.textContent = index + 1;
    sceneTotalEl.textContent = SCENES.length;

    const isLast = index === SCENES.length - 1;
    nextSceneBtn.textContent = isLast ? "Receive Your Tika →" : "Next Scene →";
  }

  enterBtn.addEventListener("click", () => {
    showScreen("screen-story");
  });

  nextSceneBtn.addEventListener("click", () => {
    if (currentScene < SCENES.length - 1) {
      currentScene += 1;
      renderScene(currentScene);
    } else {
      showScreen("screen-tika");
    }
  });

  // ------------------------------------------------------------------
  // Tika & blessing reveal
  // ------------------------------------------------------------------
  const tikaStage = document.getElementById("tikaStage");
  const tikaHint = document.getElementById("tikaHint");
  const tikaReveal = document.getElementById("tikaReveal");
  const toFinaleBtn = document.getElementById("toFinaleBtn");

  function applyTika() {
    if (tikaApplied) return;
    tikaApplied = true;

    // Reveal the tika mark, rice grains, and jamara sprig on the SVG figure.
    document.getElementById("tikaDot").style.opacity = "1";
    document.getElementById("tikaDot").style.transition = "opacity 0.4s ease";

    ["rice1", "rice2", "rice3"].forEach((id, i) => {
      const el = document.getElementById(id);
      el.style.opacity = "1";
      el.style.transition = `opacity 0.35s ease ${0.12 + i * 0.09}s`;
    });

    const sprig = document.getElementById("jamaraSprig");
    sprig.style.opacity = "1";
    sprig.style.transition = "opacity 0.5s ease 0.35s";

    tikaHint.textContent = "Tika applied — blessings received 🪔";

    // Celebration burst from the forehead area
    const rect = tikaStage.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top + 110, 18);

    tikaReveal.classList.remove("hidden");
    toFinaleBtn.disabled = false;
  }

  tikaStage.addEventListener("click", applyTika);
  tikaStage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      applyTika();
    }
  });

  toFinaleBtn.addEventListener("click", () => {
    showScreen("screen-finale");
  });

  // ------------------------------------------------------------------
  // Finale: "Send a Dashain Wish" — random blessing + petal burst
  // ------------------------------------------------------------------
  const recipientInput = document.getElementById("recipientName");
  const sendWishBtn = document.getElementById("sendWishBtn");
  const wishBox = document.getElementById("wishBox");
  const wishText = document.getElementById("wishText");
  const finaleHead = document.getElementById("finaleHead");

  function randomBlessing(name) {
    const blessing =
      BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
    return blessing.replace(/\{name\}/g, name);
  }

  sendWishBtn.addEventListener("click", () => {
    const name = recipientInput.value.trim() || "Friend";

    finaleHead.textContent = `A Dashain Wish for ${name} 🪔`;
    wishText.textContent = randomBlessing(name);
    wishBox.classList.remove("hidden");

    // Celebratory burst of petals from the button
    const rect = sendWishBtn.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top, 28);
  });

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  window.addEventListener("load", () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    renderScene(0);
  });

  window.addEventListener("resize", resizeCanvas);
})();
