/* =========================================================
   Happy Dashain — script.js
   Small, dependency-free interactions:
   petals, diyas, jamara, kite, swing, tika, wishes.
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const rand = (min, max) => min + Math.random() * (max - min);

  /* ---------------------------------------------------------
     1. Falling petals
     A tiny particle system: a gentle ambient drift plus
     celebratory bursts. Runs on one requestAnimationFrame loop.
     --------------------------------------------------------- */
  const field = $('#petalField');
  const PETAL_KINDS = ['marigold', 'marigold', 'marigold', 'gold', 'jamara'];
  const MAX_PETALS = 120;
  const petals = [];

  let viewW = window.innerWidth;
  let viewH = window.innerHeight;

  /** Create the DOM element for one petal and give it a random size. */
  function makePetalElement(kind) {
    const el = document.createElement('span');
    el.className = `petal petal--${kind}`;

    const isBlade = kind === 'jamara';
    const w = isBlade ? rand(3, 5) : kind === 'gold' ? rand(4, 7) : rand(8, 13);
    const h = isBlade ? rand(16, 28) : kind === 'gold' ? w : w * rand(1.25, 1.8);

    el.style.width = `${w.toFixed(1)}px`;
    el.style.height = `${h.toFixed(1)}px`;
    el.style.opacity = rand(0.65, 0.95).toFixed(2);

    field.appendChild(el);
    return el;
  }

  /** Add a petal to the simulation. */
  function addPetal(opts) {
    if (!field || petals.length >= MAX_PETALS) return;

    const kind = opts.kind || PETAL_KINDS[(Math.random() * PETAL_KINDS.length) | 0];
    const el = makePetalElement(kind);

    petals.push({
      el,
      x: opts.x,
      y: opts.y,
      vx: opts.vx || 0,
      vy: opts.vy || 0,
      gravity: opts.gravity || 0,
      drag: opts.drag || 0,
      swayAmp: opts.swayAmp || 0,
      swaySpeed: rand(0.5, 1.3),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, 360),
      spin: rand(-110, 110),
      life: opts.life || Infinity,
      age: 0,
      baseOpacity: parseFloat(el.style.opacity) || 0.8
    });
  }

  /** Spawn petals that drift down from above the fold. */
  function spawnAmbient() {
    addPetal({
      x: rand(-40, viewW),
      y: -30,
      vy: rand(26, 58),
      vx: rand(-14, 14),
      swayAmp: rand(12, 44)
    });
  }

  /** Celebrate at a viewport point: petals fly up, then fall. */
  function burst(x, y, count = 32) {
    if (reduceMotion || !field) return;

    const available = MAX_PETALS - petals.length;
    const total = Math.min(count, available);

    for (let i = 0; i < total; i += 1) {
      const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05);
      const speed = rand(130, 400);
      addPetal({
        x: x + rand(-14, 14),
        y: y + rand(-8, 8),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(20, 90),
        gravity: 620,
        drag: 1.5,
        swayAmp: rand(4, 16),
        life: rand(2.4, 4.2)
      });
    }
  }

  /** Advance every petal by dt seconds. */
  function updatePetals(dt) {
    for (let i = petals.length - 1; i >= 0; i -= 1) {
      const p = petals[i];
      p.age += dt;

      // Physics
      p.vy += p.gravity * dt;
      if (p.drag) {
        p.vx -= p.vx * p.drag * dt;
        p.vy -= p.vy * p.drag * dt;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;

      // Render position = fall path + sideways sway
      const sway = Math.sin(p.age * p.swaySpeed * 2 + p.phase) * p.swayAmp;
      const renderX = p.x + sway;

      // Fade out during the last 0.8s of a burst petal's life
      if (p.life !== Infinity && p.age > p.life - 0.8) {
        const fade = Math.max(0, (p.life - p.age) / 0.8);
        p.el.style.opacity = (p.baseOpacity * fade).toFixed(2);
      }

      p.el.style.transform =
        `translate3d(${renderX.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.rot.toFixed(1)}deg)`;

      const spent = p.life !== Infinity && p.age > p.life;
      const offscreen = p.y > viewH + 60 || renderX < -140 || renderX > viewW + 140;

      if (spent || offscreen) {
        p.el.remove();
        petals.splice(i, 1);
      }
    }
  }

  if (field) {
    let lastTime = performance.now();
    let spawnTimer = 0;

    // Seed the first screen with a few petals already in the air.
    if (!reduceMotion) {
      const initial = viewW < 700 ? 5 : 9;
      for (let i = 0; i < initial; i += 1) {
        addPetal({
          x: rand(0, viewW),
          y: rand(0, viewH * 0.8),
          vy: rand(26, 58),
          vx: rand(-14, 14),
          swayAmp: rand(12, 44)
        });
      }
    }

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!reduceMotion) {
        spawnTimer += dt;

        // Keep a calm, constant amount of petals in the air.
        if (spawnTimer > 0.4) {
          spawnTimer = 0;
          const ambientCount = petals.filter((p) => p.life === Infinity).length;
          const target = viewW < 700 ? 9 : 16;
          if (ambientCount < target) spawnAmbient();
        }

        if (petals.length) updatePetals(dt);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    viewW = window.innerWidth;
    viewH = window.innerHeight;
  });

  /* ---------------------------------------------------------
     2. Hero diyas — click to light, light all five for a reward
     --------------------------------------------------------- */
  const heroDiyas = $$('.diya');
  const diyaNote = $('#diyaNote');
  const heroRow = $('#heroDiyas');

  heroDiyas.forEach((diya) => {
    diya.addEventListener('click', () => {
      const wasComplete = heroRow && heroRow.classList.contains('is-complete');

      const lit = diya.classList.toggle('is-lit');
      diya.setAttribute('aria-pressed', String(lit));

      const litCount = heroDiyas.filter((d) => d.classList.contains('is-lit')).length;
      const complete = litCount === heroDiyas.length;

      if (complete) {
        diyaNote.textContent = 'All five are lit. The house is ready — welcome, Dashain.';
        if (!wasComplete) {
          const r = diya.getBoundingClientRect();
          burst(r.left + r.width / 2, r.top + 2, 34);
        }
      } else if (litCount === 0) {
        diyaNote.textContent = 'Light the five diyas to begin.';
      } else {
        diyaNote.textContent = `${litCount} of ${heroDiyas.length} diyas lit. Keep going.`;
      }

      if (heroRow) heroRow.classList.toggle('is-complete', complete);
    });
  });

  /* ---------------------------------------------------------
     3. Personalization — a name flows through the whole page
     --------------------------------------------------------- */
  const nameInput = $('#nameInput');
  const DEFAULT_NAME = 'dear one';
  let lastBlessingTemplate = '';

  const cleanName = (raw) => raw.trim().replace(/\s+/g, ' ').slice(0, 26);

  function currentName() {
    return (nameInput && cleanName(nameInput.value)) || DEFAULT_NAME;
  }

  function renderName() {
    const name = currentName();
    $$('[data-name]').forEach((el) => { el.textContent = name; });

    // Keep an already-drawn blessing in sync with a newly typed name.
    if (lastBlessingTemplate) {
      const text = lastBlessingTemplate.replace(/\{name\}/g, name);
      const wishText = $('#wishText');
      const toastText = $('#toastText');
      if (wishText) wishText.textContent = text;
      if (toastText) toastText.textContent = text;
    }
  }

  if (nameInput) {
    nameInput.addEventListener('input', renderName);
    renderName(); // respect a value the browser may have restored
  }

  /* ---------------------------------------------------------
     4. Scene one — light the nine nights, welcome the dawn
     --------------------------------------------------------- */
  const nightPanel = $('#nightPanel');
  const nightLamps = $$('.night-lamp');
  const nightNote = $('#nightNote');

  nightLamps.forEach((lamp) => {
    lamp.addEventListener('click', () => {
      const on = lamp.classList.toggle('is-lit');
      lamp.setAttribute('aria-pressed', String(on));

      const litCount = nightLamps.filter((l) => l.classList.contains('is-lit')).length;
      const complete = litCount === nightLamps.length;
      const wasDawn = nightPanel.classList.contains('is-dawn');

      nightPanel.classList.toggle('is-dawn', complete);

      if (complete) {
        nightNote.textContent = 'The tenth morning arrives. Vijaya Dashami — the day of victory.';
        if (!wasDawn) {
          const r = nightPanel.getBoundingClientRect();
          burst(r.left + r.width / 2, r.top + r.height / 2, 32);
        }
      } else if (litCount === 0) {
        nightNote.textContent = '0 of 9 nights lit.';
      } else {
        nightNote.textContent = `${litCount} of ${nightLamps.length} nights lit.`;
      }

      // A tiny spark each time a night catches light.
      if (on) {
        const r = lamp.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + 6, 5);
      }
    });
  });

  /* ---------------------------------------------------------
     5. Scene two — water the jamara and watch it grow
     --------------------------------------------------------- */
  const jamaraBed = $('#jamaraBed');
  const waterBtn = $('#waterBtn');
  const jamaraNote = $('#jamaraNote');

  const JAMARA_STAGES = [
    'Seeds in the dark. Nothing to see yet.',
    'First shoots — pale, patient, and pointed at the light.',
    'Taller now. Still no sunlight, still growing.',
    'Jamara, ready for Dashami. Tuck it behind your ear.'
  ];

  let jamaraStage = 0;

  if (waterBtn) {
    waterBtn.addEventListener('click', () => {
      if (jamaraStage >= 3) return;

      jamaraStage += 1;
      jamaraBed.dataset.stage = String(jamaraStage);
      jamaraNote.textContent = JAMARA_STAGES[jamaraStage];

      if (jamaraStage === 3) {
        waterBtn.textContent = 'Ready for Dashami 🌱';
        waterBtn.disabled = true;

        const r = jamaraBed.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height * 0.4, 24);
      } else {
        waterBtn.textContent = jamaraStage === 1 ? 'Sprinkle more water 💧' : 'Keep watering 💧';
      }
    });
  }

  /* ---------------------------------------------------------
     6. Scene three — receive the tika
     --------------------------------------------------------- */
  const tikaPanel = $('#tikaPanel');
  const tikaTrigger = $('#tikaTrigger');
  const tikaHint = $('#tikaHint');
  const tikaBlessing = $('#tikaBlessing');
  const liveRegion = $('#live');

  if (tikaTrigger) {
    tikaTrigger.addEventListener('click', () => {
      if (tikaPanel.classList.contains('is-blessed')) return;

      tikaPanel.classList.add('is-blessed');
      tikaTrigger.setAttribute('aria-pressed', 'true');
      tikaTrigger.disabled = true;
      tikaHint.textContent = 'Blessing received 🙏';

      if (liveRegion && tikaBlessing) {
        liveRegion.textContent = tikaBlessing.textContent.trim();
      }

      const r = tikaTrigger.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top - 4, 30);
    });
  }

  /* ---------------------------------------------------------
     7. Scene four — fly the kite, push the ping
     --------------------------------------------------------- */
  /** Restart a one-shot CSS animation on a child element. */
  function playOnce(button, className, animated, fallbackMs) {
    if (!button || !animated) return;

    button.classList.remove(className);
    void button.offsetWidth; // force reflow so the animation can restart
    button.classList.add(className);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      button.classList.remove(className);
      animated.removeEventListener('animationend', finish);
    };

    animated.addEventListener('animationend', finish);
    window.setTimeout(finish, fallbackMs);
  }

  const kiteBtn = $('#kiteBtn');
  const swingBtn = $('#swingBtn');

  if (kiteBtn) {
    kiteBtn.addEventListener('click', () => {
      playOnce(kiteBtn, 'is-flying', $('.kite-group', kiteBtn), 3000);
    });
  }

  if (swingBtn) {
    swingBtn.addEventListener('click', () => {
      playOnce(swingBtn, 'is-swinging', $('.swing-seat', swingBtn), 2800);
    });
  }

  /* ---------------------------------------------------------
     8. Wishes — the "Send a Dashain Wish" button
     --------------------------------------------------------- */
  const WISHES = [
    'May your lamps stay lit and your laughter stay loud, {name}. शुभ विजया दशमी!',
    'May the year ahead treat you like a favourite guest — fed first, seated warmly, never rushed.',
    'May you win the battles nobody sees, {name}, and come home to find the door open.',
    'May your hands be steady, your heart be soft, and your phone ring with good news. शुभ दसैँ!',
    'May you grow like jamara: quietly, in the dark, and then all at once in the light.',
    'May every elder bless you, every child adore you, and every plate of sel roti still be warm when you reach it.',
    'May the goddess of strength walk beside you — not ahead to fight for you, but beside you, so you never have to be brave alone.',
    'May your kites fly high, your threads stay unbroken, and your feet always find the way home.',
    'May this Dashain be a full house, a full heart, and a tika with extra dakshina.',
    'May the good in you win, again and again, on the days no one is watching.',
    'May you be given blessings you did not earn, {name} — and may you pass them on.',
    'May your worries be as temporary as a kite\'s dip, and your joys as long as the tail behind it.',
    'May the coming year know your name and spell it kindly.',
    'Here\'s to ten days of light and three hundred and fifty-five of carrying it. जय दुर्गा!'
  ];

  const wishText = $('#wishText');
  const toast = $('#toast');
  const toastText = $('#toastText');
  let lastWishIndex = -1;
  let toastTimer = 0;

  function drawBlessing() {
    let index = Math.floor(Math.random() * WISHES.length);

    // Never hand out the same blessing twice in a row.
    if (WISHES.length > 1) {
      while (index === lastWishIndex) {
        index = Math.floor(Math.random() * WISHES.length);
      }
    }
    lastWishIndex = index;

    lastBlessingTemplate = WISHES[index];
    return lastBlessingTemplate.replace(/\{name\}/g, currentName());
  }

  function sendWish(button) {
    const blessing = drawBlessing();

    if (wishText) wishText.textContent = blessing;
    if (toastText) toastText.textContent = blessing;
    if (liveRegion) liveRegion.textContent = blessing;

    if (toast) {
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 9000);
    }

    if (button) {
      const r = button.getBoundingClientRect();
      // Start just above the button so the petals do not hide its label.
      burst(r.left + r.width / 2, r.top - 6, 42);
    }
  }

  $$('.js-wish').forEach((button) => {
    button.addEventListener('click', () => sendWish(button));
  });

  if (toast) {
    toast.addEventListener('click', () => toast.classList.remove('is-visible'));
  }

  /* ---------------------------------------------------------
     9. Reveal story blocks as they scroll into view
     --------------------------------------------------------- */
  const reveals = $$('.reveal');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
