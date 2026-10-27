/* ============================================================
   js.js — gallery logic for the Rose Day model-test page
   1) Builds one card per model folder (list below).
   2) Adds soft falling petals behind the gallery.

   No frameworks, no build step — runs from a plain file:// page.
   ============================================================ */

"use strict";

/* ---------- 1. The list of tested models ------------------ *
 * To add a new test, drop the model's folder next to this file
 * and add one entry here: folder name and the files it made. */
/* Round definitions: one heading + card grid per round. */
const ROUNDS = [
  { id: "rose-day", title: "Round 1 · Rose Day",  emoji: "🌹" },
  { id: "dashain",  title: "Round 2 · Dashain",   emoji: "🪔" },
];

/* The list of tested models. Each entry carries the round it ran in. */
const MODELS = [
  { round: "rose-day", name: "DeepSeek v4.1",        folder: "Deepseek v4.1",              files: ["index.html", "style.css", "script.js"] },
  { round: "rose-day", name: "GLM-5.3 Flash (Free)", folder: "GLM5.3 flash free",          files: ["index.html", "style.css", "script.js"] },
  { round: "rose-day", name: "Nemotron Lightning",   folder: "Nemotron Lightning",         files: ["index.html", "style.css", "script.js"] },
  { round: "rose-day", name: "Nemotron Super VL",    folder: "Nemotron super vl",          files: ["index.html", "style.css", "script.js"] },
  { round: "dashain",  name: "DeepSeek v4.1",        folder: "Dashain Deepseek v4.1",      files: ["index.html", "style.css", "script.js"] },
  { round: "dashain",  name: "GLM-5.3 Flash (Free)", folder: "Dashain GLM5.3 flash free",  files: ["index.html", "style.css", "script.js"] },
  { round: "dashain",  name: "Nemotron Lightning",   folder: "Dashain Nemotron Lightning", files: ["index.html", "style.css", "script.js"] },
  { round: "dashain",  name: "Nemotron Super VL",    folder: "Dashain Nemotron super vl",  files: ["index.html", "style.css", "script.js"] },
];

/* One card per model (shared by both round grids). */
function makeCard(model, i) {
  const folderURI = encodeURIComponent(model.folder); // folder names contain spaces

  // Card shell
  const card = document.createElement("article");
  card.className = "card";
  card.style.animationDelay = `${i * 0.12}s`; // staggered entrance

  // Header
  const header = document.createElement("div");
  header.className = "card-header";
  header.innerHTML = `
    <h2>${model.name}</h2>
    <span class="model-index">Model #${i + 1}</span>
  `;

  // Preview window (sandboxed: scripts can run, nothing touches this page)
  const preview = document.createElement("div");
  preview.className = "preview";
  preview.innerHTML = `
    <span class="loading">Loading preview…</span>
    <iframe title="Preview of ${model.name}" sandbox="allow-scripts"
            src="./${folderURI}/index.html" loading="lazy"></iframe>
  `;

  // Hide the "Loading…" note once the page actually renders
  const iframe = preview.querySelector("iframe");
  iframe.addEventListener("load", () => preview.classList.add("loaded"));

  // Footer actions: see the files, open the page full screen
  const actions = document.createElement("div");
  actions.className = "card-actions";

  const filesBtn = document.createElement("a");
  filesBtn.className = "btn btn-outline";
  filesBtn.href = `./${folderURI}/`;
  filesBtn.target = "_blank";
  filesBtn.rel = "noopener noreferrer";
  filesBtn.textContent = `📂 Files (${model.files.length})`;

  const openBtn = document.createElement("a");
  openBtn.className = "btn btn-fill";
  openBtn.href = `./${folderURI}/index.html`;
  openBtn.target = "_blank";
  openBtn.rel = "noopener noreferrer";
  openBtn.textContent = model.round === "dashain" ? "🪔 Open Page" : "🌹 Open Page";

  actions.append(filesBtn, openBtn);

  card.append(header, preview, actions);
  return card;
}

/* One heading + grid of cards per round. */
function buildGallery() {
  const gallery = document.getElementById("gallery");
  let cardIndex = 0;

  ROUNDS.forEach((round) => {
    const models = MODELS.filter((m) => m.round === round.id);
    if (!models.length) return;

    const group = document.createElement("div");
    group.className = "round-group";

    const title = document.createElement("h3");
    title.className = "round-title";
    title.textContent = `${round.emoji} ${round.title}`;

    const grid = document.createElement("div");
    grid.className = "grid";
    models.forEach((model) => grid.appendChild(makeCard(model, cardIndex++)));

    group.append(title, grid);
    gallery.appendChild(group);
  });
}

/* ---------- 2. Falling petals (page background) ------------ *
 * Soft pink shapes drift from the top of the viewport at random
 * speeds/positions. Runs on an interval and cleans itself up,
 * so it never floods the DOM. */
function spawnPetal() {
  const layer = document.getElementById("petals");
  if (!layer) return;

  const petal = document.createElement("span");
  petal.className = "petal";

  const size = 8 + Math.random() * 10;                 // 8–18px
  const shades = ["#ff5c8a", "#ff8fab", "#ffb3c6", "#e75480"];
  petal.style.width  = `${size}px`;
  petal.style.height = `${size * 1.4}px`;              // slightly oval
  petal.style.left   = `${Math.random() * 100}vw`;
  petal.style.background = shades[Math.floor(Math.random() * shades.length)];
  petal.style.animationDuration = `${7 + Math.random() * 8}s`; // 7–15s fall

  petal.addEventListener("animationend", () => petal.remove());
  layer.appendChild(petal);
}

function startPetals() {
  // Respect users who prefer less motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  spawnPetal();
  setInterval(spawnPetal, 900); // one gentle petal every 0.9s
}

/* ---------- Boot ------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  buildGallery();
  startPetals();
});
