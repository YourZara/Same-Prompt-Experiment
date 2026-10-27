# 🌹 Rose Day — Same Prompt, Many Models

One prompt. Several AI models. Four "Happy Rose Day" web pages, saved exactly as each
model produced them, side by side for comparison.

---

## The Prompt

Every model received the **exact same prompt**:

> Build a simple "Happy Rose Day" web page.
>
> **STRICT RULES (read first):**
> - Work ONLY inside the current project folder. Do not read, list, open, or modify any file or directory outside it.
> - Do not use anything from my PC: no files, configs, environment variables, installed projects, or saved credentials outside this folder.
> - Do not run commands that touch anything outside this folder.
> - If you think you need something outside the folder, stop and ask me instead.
>
> **TASK:**
> Create these three files in the current folder:
> - index.html
> - style.css
> - script.js
>
> **REQUIREMENTS:**
> 1. A centered "Happy Rose Day 🌹" heading with a short romantic message.
> 2. A rose drawn with pure CSS or inline SVG (no image files).
> 3. Soft animated falling rose petals in the background (CSS or JS).
> 4. A button labeled "Send a Rose" that, when clicked, shows a new random sweet message and adds a burst of petals.
> 5. A romantic color palette (reds, pinks, soft gradients) and a nice readable font using only system fonts.
> 6. Responsive: it should look good on both phone and desktop.
> 7. Clean, commented code.
>
> When finished, give me a short summary of the files you created and tell me
> how to open it (it should work by simply opening index.html in a browser).

---

## Models Tested

Click a link to open each model's page directly, or use
[`index.html`](./index.html) for a gallery view with live previews.

| # | Model | Folder | Entry File |
|---|-------|--------|------------|
| 1 | DeepSeek v4.1 | [`Deepseek v4.1/`](./Deepseek%20v4.1/index.html) | [index.html](./Deepseek%20v4.1/index.html) |
| 2 | GLM-5.3 Flash (Free) | [`GLM5.3 flash free/`](./GLM5.3%20flash%20free/index.html) | [index.html](./GLM5.3%20flash%20free/index.html) |
| 3 | Nemotron Lightning | [`Nemotron Lightning/`](./Nemotron%20Lightning/index.html) | [index.html](./Nemotron%20Lightning/index.html) |
| 4 | Nemotron Super VL | [`Nemotron super vl/`](./Nemotron%20super%20vl/index.html) | [index.html](./Nemotron%20super%20vl/index.html) |

Each folder contains exactly what the model created — unmodified:

```
<model folder>/
├── index.html   ← open this in a browser
├── style.css    ← page styling
└── script.js    ← petal animation + message logic
```

---

## How to View

**Easiest — just open the gallery:**

> Double-click `index.html` (this project's gallery page). It links to every model's
> work, with live previews and links to each folder.

No server, build step, or install is needed — everything is plain HTML/CSS/JS.

**Open a single model's page directly:**

- `Deepseek v4.1/index.html`
- `GLM5.3 flash free/index.html`
- `Nemotron Lightning/index.html`
- `Nemotron super vl/index.html`

*(Optional, if you prefer a local server:*
`python3 -m http.server 8000` *then visit* `http://localhost:8000` *)*

---

## Notes

- All model outputs are kept untouched for a fair comparison.
- New models can be added by dropping another folder here and adding a row
  to the Models table plus a card in `js.js` (the gallery reads its card list
  from the `MODELS` array at the top of the file).
