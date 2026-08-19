# The Classic+ Tree — The-Modding-Tree

[![Deploy to GitHub Pages](https://github.com/certainjellyfish9204/The-Modding-Tree/actions/workflows/pages.yml/badge.svg)](https://github.com/certainjellyfish9204/The-Modding-Tree/actions/workflows/pages.yml)

An incremental game engine based on The Prestige Tree. This fork is **The Classic+ Multiverse** — a full TMT showcase with **11 layers** (P/B/G/M/T/W/H/Q/E/U) + 2 side layers + **5 universes** (Classic 1.0, Rewritten, Demo, Incrementreeverse, Hub), Universe-hopping, **Eternal Notations** (by MathCookie17, 144 presets), and safe-storage fallback.

**Play Now:**
- **GitHub Pages (once enabled):** `https://certainjellyfish9204.github.io/The-Modding-Tree/` 
- **Raw Githack (instant, arena v0.5):** `https://raw.githack.com/certainjellyfish9204/The-Modding-Tree/arena/01a01656-the-modding-tree/index.html?v=0.5`
- **Arena Preview:** Live preview on port 8000 in this workspace
- **Local:** Open `index.html` directly

> **v0.5 Eternal Notations** — **Eternal Notations** by MathCookie17 (144 presets, Infinity/Eternity) — **Options → Notation** switcher (TMT, Scientific, Standard, Infinity, Eternity…) + updated `break_eternity` — see `CREDITS.md`.  
> **v0.4 Multiverse** — Universe (U) row 5: 5 universes incl. Incrementreeverse (from List of Mods) — every layer ported incrementally.  
> **v0.3** — 4 new layers (M/W/Q/E) + Stats (S), 70+ upgrades. **v0.2** — Safe Storage fallback.

[Look here for a tutorial on getting started with modding with TMT](docs/tutorials/getting-started.md)

You can look in the [documentation](docs/!general-info.md) for more information on how it all works, or look at the code in [js/layers.js](js/layers.js) + `js/layers/universe.js` to see what it all looks like.

---

## Credits — Other Trees Ported

This multiverse **ports every layer** from other prestige trees — with full credit. See [`CREDITS.md`](CREDITS.md) for details. Quick summary:

| Universe | Original Game | Author | Clone Path | Status |
|----------|---------------|--------|------------|--------|
| **Classic 1.0** | `Jacorb90/Prestige-Tree-Classic` | **Jacorb90** (Aarex, papyrus) | `/tmp/PT-Classic` (7889 lines) | 6/20 layers ported as U buyables 11-13 |
| **Rewritten (PT:R)** | `Jacorb90/Prestige-Tree` (v1.3) | **Jacorb90** | `/tmp/PT-Rewritten` (9915 lines, 30 layers) | 6/30 layers ported as U buyables 21-23 |
| **Demo (TMT)** | `Acamaeda/The-Modding-Tree` Demo | **Acamaeda** | `js/Demo/` (no clone) | 3/3 layers ported as U buyables 24-25 |
| **Incrementreeverse** | `pg132/The-Modding-Tree` (The Incrementreeverse) | **pg132** | `/tmp/Incrementreeverse` (8182 lines, 16 layers) | 3/16 layers ported as U buyables 26-27 — from [List of Mods](https://modding-tree.fandom.com/wiki/List_of_mods) (finished, 10 days) |
| **Eternal Notations** | `MathCookie17/Eternal-Notations` | **MathCookie17** | `js/utils/eternal_notations.js` (1.2M) + `js/utils/NumberFormating.js` | 144 presets, Infinity/Eternity — **Options → Notation** |
| **Hub (Classic+)** | This repo `js/layers.js` | You + Acamaeda engine | `js/layers.js` (this mod) | 9 layers native + Eternal |

Each buyable in Universe U shows its original file path (e.g., `Ported from /tmp/PT-Classic/js/layers.js LAYER_DATA.p`) for traceability. To port more, just `git clone` another TMT mod into `/tmp` and add a buyable — see `js/layers/universe.js` infobox **How Porting Works**.

**Licenses:** TMT is MIT (Acamaeda), Prestige Tree Classic is MIT (Jacorb90) — we keep `LICENSE`/`Prestige-tree-license` and add attribution. If you fork, keep `CREDITS.md`.

---

## GitHub Pages — github.io treatment

This repo is **ready for Pages** — `.nojekyll` is already pushed. You just need to enable it once:

**Fastest (no workflow file needed):**
1. Go to `https://github.com/certainjellyfish9204/The-Modding-Tree/settings/pages`
2. Source: **Deploy from a branch** → Branch: `master` (or `arena/01a01656-the-modding-tree`), Folder: `/ (root)` → Save
3. Wait 1 min → `https://certainjellyfish9204.github.io/The-Modding-Tree/` is live!

**Modern (auto-deploy on every push via Actions):**
- Workflow file is blocked by Arena token scope, so add it via GitHub UI: create `.github/workflows/pages.yml` and paste contents from `pages.yml.template` (see `GITHUB_PAGES_SETUP.md` for full snippet), then set Pages Source to **GitHub Actions**.

Full steps, verification, and `gh` CLI commands are in [`GITHUB_PAGES_SETUP.md`](GITHUB_PAGES_SETUP.md) and [`pages.yml.template`](pages.yml.template).

**Forking?** Replace `certainjellyfish9204` with your username in `modInfo.id` and README links.

