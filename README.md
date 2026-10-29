<div align="center">

# Same-Prompt-Experiment

### One identical prompt, multiple AI models — raw outputs, side by side.

[![Live Gallery](https://img.shields.io/badge/Live_Gallery-Browse_Results-2088FF?style=flat-square&logo=githubpages&logoColor=white)](https://yourzara.github.io/Same-Prompt-Experiment/)
[![Outputs](https://img.shields.io/badge/Model_Output-Unmodified,_As_Produced-00E676?style=flat-square)](#results)
[![Method](https://img.shields.io/badge/Method-Identical_Prompt_Per_Round-9146FF?style=flat-square)](#method)

</div>

---

## What This Repo Is

A controlled prompt experiment: several AI models receive **byte-identical instructions** to build the same self-contained web page, and their outputs are preserved exactly as produced for fair side-by-side inspection.

The prompt *theme* is only payload — what is actually being compared is how each model:

- scaffolds a project and structures code,
- follows hard constraints (scope, self-containment, no external resources),
- handles interactivity and responsiveness with no libraries and no image assets.

So far it covers two rounds: a **greeting-page task** (Round 1) and a **story-driven festival-page task** (Round 2). Both remain in the repo as named rounds so the historical record stays intact.

🌐 **Live gallery:** <https://yourzara.github.io/Same-Prompt-Experiment/>

---

## Method

Every run is bound by the same rules, stated inside the prompt itself:

- The model works **only inside its own sandbox folder** — no reading, listing, or modifying anything outside it.
- No external resources: system fonts only, graphics drawn with pure CSS or inline SVG, no image files.
- The output must run by simply opening `index.html` in a browser — no build step, install, or server.
- Outputs are committed to the repo **untouched**: no fixes, no cleanup, no prompt re-tuning per model.

The full prompts are recorded verbatim below, since they are the ground truth of the experiment.

### Test Rig (local-only, gitignored)

The `Opencode Automation/` folder (not part of the repo) drives the runs:

- `run-test.sh` launches one `opencode run` session per model inside its own fresh output folder; `--auto` keeps unattended runs from stalling on permission prompts (the strict rules inside the prompt still confine the agent).
- `update-gallery.py` appends the model's output to the gallery, README tables, and no-JS list — idempotent.

See [Automation](#automation) for the commands.

---

## Round 1 · Greeting-Page Task (Rose Day Prompt)

The first round used a simple seasonal theme — the point being scaffold discipline and constraint compliance on a plain page, not the theme. Exact prompt:

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

## Round 2 · Story-Page Task (Dashain Prompt)

Same four models, same rules, same file trio — only the **task** changed, so the second comparison holds fairly:

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

---

## Results

### Round 1 · Greeting-page task

| # | Model | Output Folder | Entry File |
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
└── script.js    ← animation + interactive logic
```

### Round 2 · Story-page task

| # | Model | Output Folder | Entry File | Lines (html+css+js) |
|---|-------|--------|------------|---------------------|
| 5 | DeepSeek v4.1 | [`Dashain Deepseek v4.1/`](./Dashain%20Deepseek%20v4.1/index.html) | [index.html](./Dashain%20Deepseek%20v4.1/index.html) | 2225 |
| 6 | GLM-5.3 Flash (Free) | [`Dashain GLM5.3 flash free/`](./Dashain%20GLM5.3%20flash%20free/index.html) | [index.html](./Dashain%20GLM5.3%20flash%20free/index.html) | 494 |
| 7 | Nemotron Lightning | [`Dashain Nemotron Lightning/`](./Dashain%20Nemotron%20Lightning/index.html) | [index.html](./Dashain%20Nemotron%20Lightning/index.html) | 669 |
| 8 | Nemotron Super VL | [`Dashain Nemotron super vl/`](./Dashain%20Nemotron%20super%20vl/index.html) | [index.html](./Dashain%20Nemotron%20super%20vl/index.html) | 1264 |

*Lines* are raw `wc -l` across the three files — a rough effort signal, not a
quality verdict. Judge quality by opening the pages.

---

## How to View

**Online — no download needed:**

> Open the live gallery: <https://yourzara.github.io/Same-Prompt-Experiment/>
> (GitHub Pages, rebuilt automatically on every push to `main`.)

**Easiest — just open the gallery from a local copy:**

> Double-click `index.html` (this project's gallery page). It links to every model's output, with live previews and links to each folder.

No server, build step, or install is needed — everything is plain HTML/CSS/JS.

**Open a single round's output directly:**

Round 1 (greeting task):

- `Deepseek v4.1/index.html`
- `GLM5.3 flash free/index.html`
- `Nemotron Lightning/index.html`
- `Nemotron super vl/index.html`

Round 2 (story task):

- `Dashain Deepseek v4.1/index.html`
- `Dashain GLM5.3 flash free/index.html`
- `Dashain Nemotron Lightning/index.html`
- `Dashain Nemotron super vl/index.html`

*(Optional, if you prefer a local server:* `python3 -m http.server 8000` *then visit* `http://localhost:8000` *)*

---

## Notes

- All model outputs are kept untouched for a fair comparison.
- **About the rename:** this repo was formerly `same-prompt-rose-day`. The experiment is theme-agnostic — the first round simply used a Rose-Day-themed prompt — so the repo now reflects what it is rather than the first round's theme. Old repository links redirect automatically; the old GitHub Pages URL does **not**, so use the new gallery path above.
- New models can be added by dropping another output folder here and adding a row
  to the Results table plus a card in `js.js` (the gallery reads its card list
  from the `MODELS` array at the top of the file).

---

## Automation

Running another round doesn't need to be done by hand. All tooling lives in a **local-only** folder — `Opencode Automation/` — which is gitignored, so it never pollutes the repo. Test outputs still land in the project root.

- **`prompt.txt` / `prompt-<theme>.txt`** — the per-round prompt, single source of truth
- **`models-<theme>.txt`** — one `Folder Name|provider/model` pair per line
- **`run-test.sh`** — one `opencode run` session per model inside its own fresh output folder (`--auto` keeps unattended runs from stalling on permission prompts; the strict rules inside the prompt still confine the agent)
- **`update-gallery.py`** — appends the model to the gallery (`ROUNDS` + `MODELS` in `js.js`), the matching README round table, and the `index.html` no-JS list. Idempotent — running it twice changes nothing.

**Commands** (from inside `Opencode Automation/`):

```bash
opencode models                                       # list ids (provider/model)

./run-test.sh "Model Name" provider/model             # one test
./run-test.sh --batch models-<theme>.txt              # whole round
./run-test.sh --auto-commit --round-id <theme> \
  --round-title "Round N · Name" --batch models-<theme>.txt   # run + patch + push
./run-test.sh --update-only "Model Name" --round-id <theme>  # patch existing folder
./run-test.sh --dry --batch models-<theme>.txt        # preview, zero quota
```

`--auto-commit` makes two atomic commits per test — `chore:` for the model's files, `feat:` for the gallery/README patch — scans the staged diff for secret-like patterns, then pushes. Without the flag, finish a test with `./run-test.sh --update-only "Model Name" --round-id <theme>`.
