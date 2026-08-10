# 🍵 Green Tea. — branding

Working brand kit for the launch (logo, colors, fonts). Voice: **calm, precise, honest**. Not hype.

- **Brand display name:** **Green Tea.** (capitalized, with the period — the period is the mark's violet dot).
- **Package / repo name:** `@green-tea/core` (lowercase, hyphen) — like "Node.js" the brand vs `node` the package.
- **Tagline:** *A zen, opinionated, type-safe framework.*
- **Sign-off** (video / social / README close): *That's the tea.* 🍵

## 0 · Name & philosophy

Green Tea continues the idea of **Expressive Tea** (Diego's prior framework):

- **Expressive Tea** = **Express** + TypeScript. *Tea* sounds like **T** — TypeScript's T. *Expressive*: a decorator does exactly what it says, zero code repetition, shareable modules and plugins.
- **Green Tea** = **Green**, the color of calm (the color hospitals use), + the same **T** for TypeScript. The pipeline is a graph, not a middleware chain; everything in-house.

Both are "the Tea family" — **Tea = the T of TypeScript.** That lineage is a *story we tell* (README, About, video), **not** something we paint into the logo — we tried a TypeScript-blue "T" and it made a two-word wordmark look busy (three colors). Green + the violet graph-dot is the whole palette of the mark.

---

## 1 · Palette

**Green (matcha) leads the brand. Purple is the graph/interaction accent.**

| Token | Hex | Use |
|---|---|---|
| **matcha** (primary) | `#5FB88A` | brand, logo, primary buttons, links |
| **matcha-deep** | `#3FA873` | hover, dense fills, light-mode text-on-white |
| **tea-purple** (accent) | `#7C6CF0` | the graph, interactive highlights (already in `/__graph__`) |
| **tea-purple-lite** | `#A78BFA` | purple accent on dark |
| base-dark | `#0D1117` | page background |
| panel | `#161B22` | cards, code blocks |
| ink | `#E6EDF3` | primary text on dark |
| dim | `#8B949E` | secondary text, borders |

Secondary/system colors (already used by the graph viewer, keep consistent):
`GET #3FB950 · POST #A371F7 · PUT #D29922 · DELETE #F85149` · needs-edge `#2F81F7` · feeds-edge `#BF8700`.

Rule: **matcha is the identity color** (logo, docs chrome, site). Purple only appears where the *graph* appears.

---

## 2 · Logo

**DONE — production mark is `logo.svg`** (repo root): the "leaf = graph" concept — a curved, open, organic leaf (zen, not angular) where **the dependency graph IS the leaf's venation**: veins branch off the central midrib and end in nodes, one violet. **Split approach (this gave the best result):** the AI draws only the *leaf* (organic shapes are what it's good at); the *venation-graph* is hand-authored clean vector on top (crisp — vtracer traced curves as blobby). Transparent bg, exact brand hexes (matcha `#5FB88A`, violet `#7C6CF0`). Reads to ~24px. Files:
- `logo.svg` — color, transparent bg. Primary. (viewBox 0 0 611 620)
- `logo-mono.svg` — single-color (`currentColor`) for same-color backgrounds (e.g. the matcha badge) — set color via CSS.
- `leaf.png` — the AI leaf-only source (transparent, hollow). `logo.png` — the earlier full AI attempt (kept for reference).

Pipeline (repeatable): `leaf.png` was a hollow line-art leaf on transparent bg (the "glow" was baked in the RGB but alpha-0, so it drops out). `python3`+PIL: threshold alpha ≥150, crop to content, composite on white. `vtracer --colormode bw --mode spline` → one clean path. Strip the white bg path, snap fill → `#5FB88A`. **Then overlay a hand-authored venation-graph:** the real midrib centerline was detected by pixel analysis (rasterize the leaf, per-row find the middle green run) — it runs ≈(277,312)→(467,150). Curved veins (quadratic, rounded caps, width 12) branch off exact midrib points and end in nodes: `P0(277,312)↑` green, `P2(338,276)↓` green, `P3(366,258)↑` **violet apex** (r18), `P7(443,186)↓` small green (r11). "↑"=toward the upper-left lobe, "↓"=toward the lower-right lobe (perpendicular to the midrib). 4 veins reads balanced without crowding. See the leaf-only prompt below for regenerating the leaf; re-detect the midrib if the leaf changes.

<details><summary>Original generation prompts (kept for record)</summary>

Generate the **mark only — no text** (AI-rendered text in logos comes out broken; we set the wordmark in a real font, see §3). Recommended: **Concept A**. Generate a few of both and pick.

Generation tips (they make vectorizing clean):
- Flat vector, geometric, thick even strokes, high contrast, centered, generous padding.
- **No gradients, no 3D, no shadows, no photorealism** — vtracer traces flat/limited-color art cleanly.
- Ask for a version on **solid `#0D1117`** and one on **transparent**.
- Must read at **32px** (favicon) and **512px** (app icon).

### Concept A — Leaf = graph (recommended)
A tea leaf whose veins ARE a small dependency graph. Fuses the two core ideas.

**Midjourney**
```
minimalist flat vector logo mark, a single tea leaf whose internal veins form a small
dependency graph of connected dots and lines, matcha green #5FB88A with exactly one
violet #7C6CF0 accent node, geometric, clean thick strokes, centered, generous padding,
solid dark background #0D1117, no text, no gradient, no 3d, app icon, modern developer
tool branding --v 6 --style raw --ar 1:1
```

**ChatGPT (GPT image / DALL·E)**
```
Design a single flat vector logo mark, no text. Concept: a tea leaf whose internal veins
are drawn as a small dependency graph — a few dots (nodes) connected by clean straight
lines (edges), following the leaf's silhouette. Style: minimal, geometric, modern
developer-tool branding, thick even strokes, high contrast, lots of padding, centered.
Palette: matcha green as the main color (#5FB88A / #3FA873) with exactly one accent node
in violet (#7C6CF0). Flat only — no gradients, no 3D, no shadows, no photorealism.
Give me two versions: one on solid dark #0D1117, one on transparent. Square icon that
still reads clearly at 32 pixels.
```

### Concept B — Minimal node-mark (safe alt)
An abstract graph node with edges, arranged into a leaf-like shape. More "graph", less "tea".

**Midjourney**
```
minimalist flat vector logo, a single graph node with three edges radiating to smaller
nodes, arranged into an abstract leaf shape, matcha green #5FB88A with one violet #7C6CF0
accent node, geometric, thick strokes, centered, solid dark background #0D1117, no text,
no gradient, app icon --v 6 --style raw --ar 1:1
```

**ChatGPT**
```
Design a single flat vector logo mark, no text: an abstract dependency-graph glyph — one
central dot with clean lines connecting to a few smaller dots, the overall silhouette
suggesting a tea leaf. Minimal, geometric, thick even strokes, centered, generous padding.
Matcha green (#5FB88A) with exactly one violet (#7C6CF0) accent node. Flat — no gradients,
no 3D, no shadows. One version on solid #0D1117, one transparent. Must read at 32px.
```

### PNG → SVG (vtracer is installed)
```bash
# color logo, smooth curves, denoised — good defaults for a flat mark
vtracer --input logo.png --output logo.svg \
  --colormode color --mode spline --filter_speckle 4 \
  --color_precision 6 --corner_threshold 60

# monochrome variant (single-color mark)
vtracer --input logo.png --output logo-mono.svg --colormode bw --mode spline --filter_speckle 4
```
Then open the SVG, remove the traced background rectangle if present, and snap colors to the exact hexes above.

</details>

---

## 3 · Fonts

**Wordmark: Zen Maru Gothic** (Google Fonts, free) — rounded Japanese gothic. Calm, soft, distinctive, and it ties to the tea/matcha origin. Deliberately NOT a generic dev monospace.

- **Primary lockup (LOCKED):** **`Green Tea.`** — weight **700**, matcha `#5FB88A`, with a **violet `#7C6CF0` period**. Capitalized. Two colors only — no TypeScript-blue T (tried it, too busy).
- Lighter/airier alt: weight 500. Heavier statement: weight 900.
- Light mode: wordmark in matcha-deep `#3FA873`. No-color contexts: ink `#E6EDF3` (dark) / `#0D1117` (light).
- The violet dot is the signature detail — keep it.

```css
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap');
.wordmark { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 700; color: #5FB88A; }
.wordmark .dot { color: #7C6CF0; }        /* the "." in "Green Tea." */
```

**Body / UI text** (docs, site): **Zen Kaku Gothic New** — same "Zen" family, more neutral, reads well at small sizes → cohesive without the wordmark's roundness everywhere. (System sans / Inter is a fine fallback.)

**Code / terminal:** a monospace — low brand stakes, pick for readability. IBM Plex Mono or JetBrains Mono. Decide when building the site.

> Wordmark locked. Pending: your final pick of weight (700 vs 500) + dot yes/no, and the real mark from Midjourney to finalize the lockup spacing.
