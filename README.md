# 🌹🪔 Same Prompt, Many Models — Two Rounds

Two identical prompts, one set of AI models. **Round 1** built "Happy Rose Day"
pages; **Round 2** built interactive, story-driven "Happy Dashain" greetings.
Eight results, saved exactly as each model produced them, side by side.

🌐 **Live gallery:** <https://yourzara.github.io/same-prompt-rose-day/>

---

## Round 1 · The Rose Day Prompt

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

### Models Tested (Round 1)

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

## Round 2 · The Dashain Prompt

The same four models on a second stage: only the **task** changed —
the strict rules, the file trio, and the self-contained constraints are identical
to Round 1, so the second comparison holds fairly.

> Build an interactive, eye-catching website to wish someone
> "Happy Dashain 🪔" — and it must tell a short story with real meaning,
> not just a plain wish.
>
> *(same STRICT RULES as Round 1: work only inside the current folder; no reading
> or touching anything outside it; stop and ask if something outside is ever needed)*
>
> **TASK:** Create these three files in the current folder:
> - index.html
> - style.css
> - script.js
>
> **REQUIREMENTS:**
> 1. A striking first screen with a big "Happy Dashain 🪔" greeting and a warm
>    message for the person receiving the wish.
> 2. A short STORY woven into the page that carries the meaning of Dashain —
>    for example, why elders give tika and jamara, or the victory of good over
>    evil — told across the visit, scene by scene, not dumped as one paragraph.
> 3. An INTERACTIVE experience, for example: falling marigold petals and
>    jamara, a diya that lights up when clicked, a kite or ping (bamboo swing)
>    moment, a tika-and-blessing reveal, and a final personalized wish.
> 4. A button labeled "Send a Dashain Wish" that, when clicked, shows a new
>    random blessing and triggers a celebratory burst of petals.
> 5. A festive festival palette (crimson reds, marigold orange-yellow, festival
>    gold, soft gradients) and a nice readable font using only system fonts.
> 6. No image files — everything drawn with pure CSS or inline SVG.
> 7. Responsive: it should look good on both phone and desktop.
> 8. Clean, commented code.
>
> When finished, give me a short summary of the files you created and tell me
> how to open it (it should work by simply opening index.html in a browser).

### Models Tested (Round 2)

| # | Model | Folder | Entry File | Lines (html+css+js) |
|---|-------|--------|------------|---------------------|
| 5 | DeepSeek v4.1 | [`Dashain Deepseek v4.1/`](./Dashain%20Deepseek%20v4.1/index.html) | [index.html](./Dashain%20Deepseek%20v4.1/index.html) | 2225 |
| 6 | GLM-5.3 Flash (Free) | [`Dashain GLM5.3 flash free/`](./Dashain%20GLM5.3%20flash%20free/index.html) | [index.html](./Dashain%20GLM5.3%20flash%20free/index.html) | 494 |
| 7 | Nemotron Lightning | [`Dashain Nemotron Lightning/`](./Dashain%20Nemotron%20Lightning/index.html) | [index.html](./Dashain%20Nemotron%20Lightning/index.html) | 669 |
| 8 | Nemotron Super VL | [`Dashain Nemotron super vl/`](./Dashain%20Nemotron%20super%20vl/index.html) | [index.html](./Dashain%20Nemotron%20super%20vl/index.html) | 1264 |

*Lines* are raw wc -l across the three files — a rough effort signal, not a
quality verdict. Judge quality by opening the pages.

---

## How to View

**Online — no download needed:**

> Open the live gallery: <https://yourzara.github.io/same-prompt-rose-day/>
> (GitHub Pages, rebuilt automatically on every push to `main`.)

**Easiest — just open the gallery from a local copy:**

> Double-click `index.html` (this project's gallery page). It links to every model's
> work, with live previews and links to each folder.

No server, build step, or install is needed — everything is plain HTML/CSS/JS.

**Open a single model's page directly:**

Round 1 — Rose Day:

- `Deepseek v4.1/index.html`
- `GLM5.3 flash free/index.html`
- `Nemotron Lightning/index.html`
- `Nemotron super vl/index.html`

Round 2 — Dashain:

- `Dashain Deepseek v4.1/index.html`
- `Dashain GLM5.3 flash free/index.html`
- `Dashain Nemotron Lightning/index.html`
- `Dashain Nemotron super vl/index.html`

*(Optional, if you prefer a local server:*
`python3 -m http.server 8000` *then visit* `http://localhost:8000` *)*

---

## Notes

- All model outputs are kept untouched for a fair comparison.
- New models can be added by dropping another folder here and adding a row
  to the Models table plus a card in `js.js` (the gallery reads its card list
  from the `MODELS` array at the top of the file).

---

## Automation

Running another test doesn't need to be done by hand. Three files automate the loop:

- **`prompt.txt`** — the prompt above as a single source of truth
- **`run-test.sh`** — starts one `opencode run` session per model inside its own
  fresh folder. (`--auto` keeps unattended runs from stalling on permission
  prompts; the strict rules inside the prompt still confine the agent to that folder.)
- **`update-gallery.py`** — after a run, appends the model to the gallery
  (`MODELS` array in `js.js`), the README table, and the `index.html` no-JS list.
  Idempotent — running it twice changes nothing.

**Commands:**

```bash
opencode models                                    # list model ids (format: provider/model)

./run-test.sh "Model Name" provider/model          # run one test
./run-test.sh --auto-commit "Name" provider/model  # run + patch gallery/README + push
./run-test.sh --batch models.txt                   # lines: Folder Name|provider/model
./run-test.sh --update-only "Model Name"           # patch gallery+README for an existing folder
./run-test.sh --dry "Model Name" provider/model    # preview commands, run nothing
```

`--auto-commit` makes two atomic commits per test — `chore:` for the model's
files, `feat:` for the gallery/README patch — scans the staged diff for
secret-like patterns, then pushes. Without the flag, finish a test with
`./run-test.sh --update-only "Model Name"`.
