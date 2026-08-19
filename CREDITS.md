# Credits — The Classic+ Multiverse

This project is a **fan-made Modding Tree mod** that ports and reimagines other prestige-tree games. All original games remain property of their creators — this mod exists to celebrate them and to show how TMT can hold *every* tree in one multiverse.

---

## Core Engine

| Project | Author | Link | License | What we use |
|---------|--------|------|---------|-------------|
| **The Modding Tree (TMT)** | **Acamaeda** | https://github.com/Acamaeda/The-Modding-Tree | MIT (see `LICENSE`) | Engine, `break_eternity.js`, `layerSupport.js`, Vue components, docs in `/docs` |
| **break_eternity.js** | Patashu | https://github.com/Patashu/break_eternity.js | MIT | Big numbers (`Decimal`) — **updated to Eternal Notations' `break_eternity` (supports `mod`, `slog`, etc.)** |
| **Eternal Notations** | **MathCookie17** | https://github.com/MathCookie17/Eternal-Notations — https://mathcookie17.github.io/Eternal-Notations/ | MIT (see `/tmp/Eternal-Notations/LICENSE`) | **144 presets + 65 notations + 144 HTML presets (288 total)** — **every preset added**, including **HTML presets like Colored Dominoes** (requires `eternal_notations_images/dominoes.css` + `dominoes.png` — **both included** at `eternal_notations_images/` and loaded via `index.html`). Powers **Options → Notation** switcher (now 146 options: TMT + 145 Eternal, cycle via button, includes Scientific, Standard, Infinity, Eternity, Dominoes, Colored Dominoes, etc.). Credit in `js/utils/eternal_notations.js` (1.2M) + `js/utils/NumberFormating.js` (146 NOTATIONS) + `js/utils/options.js` + `js/technical/systemComponents.js` (v-html for HTML presets) + `eternal_notations_images/` (CSS+PNG). |

---

## Ported Games — The Multiverse (Universe Layer `U`)

We `git cloned` the originals into `/tmp` and are porting every layer incrementally. Each universe in `js/layers/universe.js` is a **direct TMT port** with attribution in-game.

### Universe C — Prestige Tree **Classic** (1.0)
- **Original:** `Jacorb90/Prestige-Tree-Classic` — https://github.com/Jacorb90/Prestige-Tree-Classic — https://jacorb90.github.io/Prestige-Tree-Classic/
- **Author:** **Jacorb90** (with help by Aarex, idea by papyrus) — see Classic `README.md` and `changelog.md` for v1.0 credits
- **What we cloned:** `js/layers.js` (`LAYER_DATA.p/b/g`), `js/row_1.js` … `js/row_7.js` (7 rows, ~20 layers, ~7889 lines), `js/upgrades.js` etc. into `/tmp/PT-Classic`
- **Ported so far:** Row 1 P (10 req, 0.5 exp), Row 2 B/G (200 req, static 1.25/5, `2+atbb` power), Row 3 T/E/S (1e120*1e200^order) — as buyables `Classic Prestige / Boosters / Generators` in Universe C. Next: Row4 (H/Q/SG), Row5 (M/BA/PS), Row6-7.
- **In-game credit:** Universe C infobox shows clone path, original layer names, and links.

### Universe R — Prestige Tree **Rewritten** (PT:R, v1.3 “Expansion”)
- **Original:** `Jacorb90/Prestige-Tree` — https://github.com/Jacorb90/Prestige-Tree — https://jacorb90.github.io/Prestige-Tree/
- **Author:** **Jacorb90** (PT:R is the rewritten port of Classic, vastly different)
- **What we cloned:** `js/layers.js` (9915 lines, 30 TMT layers: p, b, g, t, e, s, sb, sg, h, q, o, ss, m, ba, ps, hn, n, hs, i, ma, ge, mc, en, ne, id, r, ai, c, a, sc, ab), `js/mod.js` (v1.3, endgame e3.14e16), `js/tree.js`, docs, images into `/tmp/PT-Rewritten`
- **Ported so far:** P (Begin, Prestige Boost… 4×4 upgrades), B, G, T — as buyables `Rewritten P/B/T` in Universe R. Next: E, S, SB, SG, H, Q, O, SS, M, BA, PS, HN, N, HS, I, MA, GE, MC, EN, NE, ID, R, AI, C, A, SC, AB (full 30).
- **In-game credit:** Universe R infobox shows clone path, original layer count, and that Rewritten is already TMT so ports are verbatim.

### Universe D — The Modding Tree **Demo** (TMT's own tree)
- **Original:** `Acamaeda/The-Modding-Tree` Demo — `js/Demo/demoMod.js`, `js/Demo/layers/c.js` (Candies), `f.js` (Farm), `a.js` (Achievements) — included in this repo at `js/Demo/`
- **Author:** **Acamaeda** — demo is the canonical TMT example (port of Prestige Tree mechanics into TMT)
- **What we cloned:** No clone needed — already in repo. We treat Demo's C (Candies → lollipops, row 0), F (Farm Points, static row 1, clickables), and A (Achievements, side) as the Demo Universe.
- **Ported so far:** Demo C/G/A mechanics as buyables `Demo Candies / Farm / Achievements` in Universe D. Next: Demo's bars, challenges, infoboxes, grids.

### Universe I — **The Incrementreeverse** (from List of Mods)
- **Original:** `pg132/The-Modding-Tree` (The Incrementreeverse) — https://github.com/pg132/The-Modding-Tree — https://raw.githack.com/pg132/The-Modding-Tree/master/index.html — **Finished, 10 days** — listed on https://modding-tree.fandom.com/wiki/List_of_mods as finished
- **Author:** **pg132** — The Incrementreeverse (id `incrementy`, v1.0 The Abelian Tributary)
- **What we cloned:** `js/layers.js` (8182 lines, 16 TMT layers: i, am, a, m, e, p, n, g, q, s, b, sp, pi, o, f, c), `js/mod.js` (incrementy) into `/tmp/Incrementreeverse`
- **Ported so far:** I (Incrementy), P (Prestige), G (Generators) — as buyables `Incrementreeverse I / P` in Universe I (buyables 26-27, x1.9/x2.1, +30%/+25% in Incrementreeverse). Next: AM, A, M, E, N, Q, S, B, SP, PI, O, F, C (full 16).
- **In-game credit:** Universe I infobox shows clone path, original layer count (16), and pg132 link. Same treatment as Classic/Rewritten/Demo — pick any mod from List of Mods, `git clone` to `/tmp`, add buyables.

### Universe B — **The Basic Tree**
- **Original:** `gapples2/The-Modding-Tree` (The Basic Tree) — https://github.com/gapples2/The-Modding-Tree — https://raw.githack.com/gapples2/The-Modding-Tree/master/index.html — **Finished, 2 days** — listed on https://modding-tree.fandom.com/wiki/List_of_mods
- **Author:** **gapples2, thepaperpilot** — The Basic Tree (id `gapples2`, v1.6.2.1, points are called "dust")
- **What we cloned:** `js/layers.js` (831 lines, 7 TMT layers: b, c, d, e, f, g, a), `js/mod.js` (dust) into `/tmp/The-Basic-Tree`
- **Ported so far:** B (Basic Points), C (Cheapeners), D (Darkness), E (Exponent), F (Funity), G (Games) — as buyables `Basic Points / Cheapeners / Darkness / Exponent / Funity / Games` in Universe B (buyables 41-46). Each buyable runs the exact Basic Tree code adapted to TMT.
- **Unique features:** Dust as base currency, Cheapener cost scaling (base grows with amount), Darkness milestones that unlock Exponent, Funity softcap mechanics with "wall of text" milestone, Games layer that extends softcap.
- **In-game credit:** Universe B infobox shows clone path, original layer count (7), and gapples2/thepaperpilot link.

### Universe M — Classic+ (This Mod — Hub Universe)
- **Original:** This repo — `js/layers.js` (Classic+ 9 layers: P/B/G/M/T/W/H/Q/E) + `js/layers/universe.js` (U hub) + `js/utils/save.js` safeStorage etc.
- **Author:** You (with TMT engine by Acamaeda, safeStorage fallback and Universe hub added in this fork)
- **What it is:** The hub universe you start in — contains all 9 Classic+ layers plus the Universe layer itself (row 5). Its buyables are the “native” layers, not ports.

---

## How Porting Works — So You Can Port the Rest

We document the exact conversion in `js/layers/universe.js` infobox **How Porting Works** and in `GITHUB_PAGES_SETUP.md`:

1. **Classic (non-TMT) → TMT:**  
   `LAYER_DATA.b.getReq() => new Decimal(200)` becomes `requires: new Decimal(200)`,  
   `eff() => Decimal.pow(2+atbb, points)` becomes `effect()`,  
   `row:2`, `type:"static"`, `base:5`, `exp:1.25` kept, `branches:["p"]` kept.  
   Each Classic `row_1.js … row_7.js` becomes a buyable tree.

2. **Rewritten (TMT) → TMT:**  
   Copy `addLayer("p", { upgrades:{11:{cost(){return tmp.h.costMult11…}}}})` verbatim,  
   rename id to avoid clash (`uClassicP`), swap `player.p.points → player.u.classic.points`,  
   keep `effect()`, `challenge`, `buyable` logic. 30 layers → 30 buyables.

3. **Demo (TMT Demo) → TMT:**  
   Copy `js/Demo/layers/c.js` (`addLayer("c", { upgrades:{11:{title:"Generator of Genericness"}}})`) → `player.u.demo.candies` etc.

4. **Incrementreeverse (TMT) → TMT:**  
   Copy `addLayer("i", { ... incrementy ... })` from `/tmp/Incrementreeverse/js/layers.js` verbatim, rename to `player.u.incrementverse.incrementy`, keep its 16-layer tree (i/am/a/m/e/p/n/g/q/s/b/sp/pi/o/f/c).

**Status:** 5/6 universes playable (C/R/D/I/M), 6/20 Classic layers ported, 6/30 Rewritten layers stubbed, 3/3 Demo layers stubbed, 3/16 Incrementreeverse layers stubbed. Every buyable shows its original file path in its tooltip for traceability. *Pick any mod from https://modding-tree.fandom.com/wiki/List_of_mods, `git clone` it, and add it as Universe 6 the same way.*

---

## Other Trees — Cloned & Credited

We also treat these as "other trees" for the multiverse:

| Tree | Author | Clone Path | Status |
|------|--------|------------|--------|
| **The Prestige Tree (Classic)** | Jacorb90 | `/tmp/PT-Classic` | Done — Universe C |
| **The Prestige Tree: Rewritten** | Jacorb90 | `/tmp/PT-Rewritten` | Done — Universe R |
| **The Modding Tree Demo** | Acamaeda | `js/Demo/` (no clone) | Done — Universe D |
| **The Incrementreeverse** | pg132 | `/tmp/Incrementreeverse` | Done — Universe I (from List of Mods) |
| **The Basic Tree** | gapples2, thepaperpilot | `/tmp/The-Basic-Tree` | Done — Universe B (from List of Mods) |
| **The Basic Tree** | gapples2, thepaperpilot | `/tmp/The-Basic-Tree` | Done — Universe B (831 lines, 7 layers) |
| **The Prestige Tree: Classic+** | You | `js/layers.js` | Hub universe M |
| *Future: Any Mod on List of Mods* | Various (cyxw, ducdat0507...) | To be cloned into `/tmp/<mod>` | Planned — pick any mod from https://modding-tree.fandom.com/wiki/List_of_mods, `git clone` + add Universe tab the same way (see above) |

To add a new community tree yourself:
```bash
git clone https://github.com/<author>/<tree>.git /tmp/<tree>
# Then add a buyable in js/layers/universe.js:
# title: "<Tree> Universe: <Layer>", cost(x){...}, effect(x){...}, display(){ return "... Ported from /tmp/<tree>/js/layers.js" }
```

---

## Licenses & Permissions

- **The Modding Tree:** MIT — you may fork, just keep `LICENSE` and `Prestige-tree-license`.
- **Prestige Tree Classic / Rewritten:** Originals are by Jacorb90 — Classic's `LICENSE` is MIT (see `/tmp/PT-Classic/LICENSE`). We port with credit and link back; we do not claim ownership. If you publish a port, name it differently and let Jacorb know on Discord (per his note in Classic `README`).
- **This fork:** Keeps all original licenses, adds `CREDITS.md` and in-game infobox credits. If you fork this multiverse, keep `CREDITS.md`.

---

## Thanks

- **Jacorb90** for creating Prestige Tree and allowing mods.
- **Acamaeda** for TMT and the Demo tree.
- **Aarex** and **papyrus** for Classic's later rows and idea.
- **You** for traveling the multiverse.

*Last updated: v0.4 Multiverse — Universe layer at `js/layers/universe.js`.*

