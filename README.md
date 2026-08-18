# The Classic+ Tree — The-Modding-Tree

[![Deploy to GitHub Pages](https://github.com/certainjellyfish9204/The-Modding-Tree/actions/workflows/pages.yml/badge.svg)](https://github.com/certainjellyfish9204/The-Modding-Tree/actions/workflows/pages.yml)

An incremental game engine based on The Prestige Tree. This fork is **The Classic+ Tree** — a full showcase starter with 5 layers (P/B/G/T/H) + Achievements and safe-storage fallback.

**Play Now:**
- **GitHub Pages (once enabled):** `https://certainjellyfish9204.github.io/The-Modding-Tree/` 
- **Raw Githack (instant, no setup, works NOW):** `https://raw.githack.com/certainjellyfish9204/The-Modding-Tree/arena/01a01656-the-modding-tree/index.html`
- **Arena Preview:** Live preview on port 8000 in this workspace
- **Local:** Open `index.html` directly

> **v0.2** — Safe Storage fallback (localStorage → sessionStorage → memory) + red banner when saves are memory-only.  
> **Pages ready:** `.nojekyll` added, see `GITHUB_PAGES_SETUP.md` + `pages.yml.template`.

[Look here for a tutorial on getting started with modding with TMT](docs/tutorials/getting-started.md)

You can look in the [documentation](docs/!general-info.md) for more information on how it all works, or look at the code in [js/layers.js](js/layers.js) to see what it all looks like.

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

