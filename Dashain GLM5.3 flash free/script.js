/* ===== Happy Dashain — interactivity =====
 * Pure vanilla JS. Falls petals, lights the diya,
 * reveals scenes, animates the ping swing, and
 * sends randomized Dashain blessings.
 */

(() => {
  "use strict";

  /* ---------- 1. Falling petals & jamara ---------- */
  const sky = document.getElementById("sky");

  /** Create one petal element with a random horizontal start, size, and spin. */
  function spawnPetal(isJamara = false) {
    const p = document.createElement("span");
    p.className = isJamara ? "petal jamara" : "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--dur", 5 + Math.random() * 5 + "s");
    p.style.setProperty("--spin", Math.round(Math.random() * 720 - 360) + "deg");
    p.style.scale = (0.6 + Math.random() * 0.8).toFixed(2);
    sky.appendChild(p);
    // Clean up after the animation so the DOM never grows unbounded
    p.addEventListener("animationend", () => p.remove());
  }

  // Gentle ambient drizzle: alternate marigold petals and jamara strands.
  setInterval(() => spawnPetal(Math.random() < 0.35), 450);

  /** Big celebratory burst — a shower of many petals at once. */
  function burst(count = 26) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnPetal(Math.random() < 0.4), i * 55);
    }
  }

  /* ---------- 2. Light the diya (hero) ---------- */
  const flame = document.querySelector(".flame");
  const lightBtn = document.getElementById("lightDiya");
  lightBtn.addEventListener("click", () => {
    const wasUnlit = !flame.classList.contains("lit");
    flame.classList.toggle("lit");
    if (wasUnlit) burst(14); // small celebratory spark when first lit
  });

  /* ---------- 3. Scene-by-scene story reveals ---------- */
  // Victory-of-good reveal
  const canonReveal = document.querySelector(".canon-reveal");
  document.querySelector(".canon-btn").addEventListener("click", () => {
    canonReveal.innerHTML =
      'On the <b>tenth dawn — Vijaya Dashami</b> — the light rose, ' +
      'and the shadow fell. That tenth day is why we call it <b>Victory</b>. ✨';
    canonReveal.classList.add("show");
  });

  // Tika & blessing reveal
  const tikaReveal = document.querySelector(".tika-reveal");
  document.querySelector(".tika-btn").addEventListener("click", () => {
    tikaReveal.classList.add("show");
    burst(10);
  });

  // Ping swing animation
  const ping = document.querySelector(".ping");
  document.querySelector(".ping-btn").addEventListener("click", () => {
    ping.classList.remove("swinging");
    void ping.offsetWidth;           // restart CSS animation
    ping.classList.add("swinging");
    setTimeout(() => ping.classList.remove("swinging"), 6600);
  });

  /* ---------- 4. Fade scenes in as you scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    }),
    { threshold: 0.18 }
  );
  document.querySelectorAll(".scene:not(.scene-hero)").forEach((s) => io.observe(s));

  /* ---------- 5. Personalized finale + wish shuffler ---------- */
  const nameInput = document.getElementById("nameInput");
  const finaleTitle = document.getElementById("finaleTitle");
  const finalWish = document.getElementById("finalWish");
  const sendBtn = document.getElementById("sendWish");

  // Keep the greeting's name in sync as the visitor types.
  nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    finaleTitle.textContent = name ? `Dear ${name},` : "Dear Guest,";
  });

  // Short blessings carrying real Dashain meaning.
  // {n} is replaced with the receiver's name.
  const blessings = [
    "{n}, may the tika on your forehead carry ten days of courage into every year ahead. 🙏",
    "May jamara grow tall at your door, {n}, and worries grow small in your heart. 🌾",
    "{n}, this Dashain, may swinging high remind you life always returns gently. 🎋",
    "May the diya you lit today, {n}, keep burning through every dark season. 🪔",
    "{n}, may your battles end like Dashain did — with you, and with the light, standing. ✨",
    "Wishing {n} a feast of laughter and a home the whole family gathers in. 🎉",
    "{n}, may every road you take next festival season lead somewhere warm. 🧡",
  ];

  let lastIdx = -1;

  sendBtn.addEventListener("click", () => {
    // Pick a fresh blessing (never the same twice in a row)
    let idx;
    do { idx = Math.floor(Math.random() * blessings.length); }
    while (idx === lastIdx);
    lastIdx = idx;

    const name = nameInput.value.trim() || "friend";
    finalWish.textContent = blessings[idx].replace("{n}", name);
    burst(26); // celebratory petal burst
  });
})();
