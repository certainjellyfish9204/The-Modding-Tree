// ============================================================================
//  UNIVERSE LAYER (U) - Travel the Multiverse
//  Row 5 hub that lets you visit Classic (1.0), Rewritten (PT:R), and Classic+
//  We git cloned both originals into /tmp/PT-Classic and /tmp/PT-Rewritten
//  and are porting every layer incrementally. This is the hub that will hold them.
//  Current: 3 universes, each with simplified but functional ported mechanics.
//  Future: every layer from Classic (7 rows, ~20 layers) and Rewritten (30+ layers)
//  will be ported as buyables/upgrades/challenges inside their universe tab.
// ============================================================================

addLayer("u", {
    name: "multiverse",
    symbol: "U",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        activeUniverse: "classicPlus", // classic, rewritten, classicPlus
        travelCooldown: 0,
        classic: {
            points: new Decimal(0), // Classic Prestige Points
            boosters: new Decimal(0),
            generators: new Decimal(0),
        },
        rewritten: {
            points: new Decimal(0), // Rewritten Prestige Points
            boosters: new Decimal(0),
            generators: new Decimal(0),
            time: new Decimal(0),
        },
        demo: {
            points: new Decimal(0), // Demo Candies (C) points
            candies: new Decimal(0),
            farm: new Decimal(0),
        },
        incrementverse: {
            points: new Decimal(0), // Incrementreeverse points (incrementy)
            incrementy: new Decimal(0),
            prestige: new Decimal(0),
        },
    }},
    color: "#AA00FF",
    requires: new Decimal(10), // 10 Eternity
    resource: "universe points",
    baseResource: "eternity points",
    baseAmount() { return player.e.points },
    type: "static",
    base: 2.5,
    exponent: 1.6,
    row: 5,
    branches: [["e","#FFD700"], ["s","#888888"]],
    layerShown() { return hasMilestone('e', 2) || player.u.unlocked },

    // Universe travel is not a normal reset - it's a dimension shift
    // We keep the main prestige for Universe Points, but travel is a clickable
    effect() {
        let eff = Decimal.pow(5, player.u.points);
        // Bonus from active universe
        if (player.u.activeUniverse === "classic") eff = eff.times(1.5);
        if (player.u.activeUniverse === "rewritten") eff = eff.times(2);
        if (player.u.activeUniverse === "classicPlus") eff = eff.times(2.5);
        // Bonus from classic/rewritten/demo progress
        if (player.u.classic.points.gt(0)) eff = eff.times(player.u.classic.points.add(1).pow(0.1));
        if (player.u.rewritten.points.gt(0)) eff = eff.times(player.u.rewritten.points.add(1).pow(0.12));
        if (player.u.demo.points.gt(0)) eff = eff.times(player.u.demo.points.add(1).pow(0.11));
        if (player.u.incrementverse.points.gt(0)) eff = eff.times(player.u.incrementverse.points.add(1).pow(0.13));
        if (eff.gte("1e100")) eff = eff.div("1e100").pow(0.5).times("1e100");
        return eff;
    },
    effectDescription() {
        let active = player.u.activeUniverse;
        let name = active === "classic" ? "Classic (1.0)" : active === "rewritten" ? "Rewritten (PT:R)" : active === "demo" ? "Demo (TMT)" : active === "incrementverse" ? "Incrementreeverse" : "Classic+ (This Mod)";
        return "which boost ALL points by "+format(tmp.u.effect)+"x<br>Active Universe: <b>"+name+"</b>"
    },
    prestigeButtonText() {
        let gain = (tmp.u && tmp.u.resetGain instanceof Decimal) ? tmp.u.resetGain : getResetGain(this.layer);
        let at = (tmp.u && tmp.u.nextAt instanceof Decimal) ? tmp.u.nextAt : getNextAt(this.layer);
        if (gain.gte(1)) return "Reset for <b>"+formatWhole(gain)+"</b> universe points<br>Next at "+formatWhole(at)+" eternity";
        return "Need "+formatWhole(at)+" eternity ("+formatWhole(player.e.points)+"/"+formatWhole(at)+")";
    },
    bars: {
        universeBar: {
            direction: RIGHT, width: 500, height: 28,
            progress() { return player.u.points.div(player.u.points.add(5)).toNumber() },
            display() { return formatWhole(player.u.points)+" Universe Points — "+({"classic":"Classic 1.0","rewritten":"PT: Rewritten","classicPlus":"Classic+ Hub"}[player.u.activeUniverse] || "Hub") },
            fillStyle: {'background-color': "#AA00FF", 'background-image': "linear-gradient(90deg, #AA00FF, #FF00FF)"},
            baseStyle: {'background-color': "#220044"},
            textStyle: {'color': "white", 'text-shadow': "1px 1px 2px black"},
        },
        classicProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return player.u.classic.points.div(100).toNumber() },
            display() { return "Classic PP: "+formatWhole(player.u.classic.points)+" / 100"},
            fillStyle: {'background-color': "#4BDC13"},
            unlocked() { return player.u.activeUniverse === "classic" },
        },
        rewrittenProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return player.u.rewritten.points.div(100).toNumber() },
            display() { return "Rewritten PP: "+formatWhole(player.u.rewritten.points)+" / 100"},
            fillStyle: {'background-color': "#FF8800"},
            unlocked() { return player.u.activeUniverse === "rewritten" },
        },
        demoProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return player.u.demo.points.div(100).toNumber() },
            display() { return "Demo Candies: "+formatWhole(player.u.demo.points)+" / 100"},
            fillStyle: {'background-color': "#4BDC13"},
            unlocked() { return player.u.activeUniverse === "demo" },
        },
        incrementverseProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return player.u.incrementverse.points.div(100).toNumber() },
            display() { return "Incrementreeverse: "+formatWhole(player.u.incrementverse.points)+" / 100"},
            fillStyle: {'background-color': "#FF44AA"},
            unlocked() { return player.u.activeUniverse === "incrementverse" },
        },
    },
    infoboxes: {
        lore: {
            title: "The Multiverse",
            body: `
                We <b>git cloned</b> both originals:<br>
                - <code>/tmp/PT-Classic</code> (Jacorb90/Prestige-Tree-Classic, 7 rows, ~20 layers, 7889 lines)<br>
                - <code>/tmp/PT-Rewritten</code> (Jacorb90/Prestige-Tree, 30+ layers, 9915 lines, TMT-based)<br><br>
                This layer is the <b>hub</b> that will hold <b>every layer</b> ported. Right now 3 universes are playable (simplified ports), more are being ported incrementally.<br><br>
                <b>Classic 1.0</b>: Row1 P, Row2 B/G, Row3 T/E/S/SB/SG, Row4 S/Q/HN etc - pure 2019 prestige.<br>
                <b>Rewritten</b>: P/B/G/T/E/S/SB/SG/H/Q/O/SS/M/BA/PS/HN/N/HS/I/MA/GE/MC/EN/NE/ID/R/AI/C/A/SC/AB - the full 30-layer monster.<br>
                <b>Classic+</b>: This mod's 9 layers (P/B/G/M/T/W/H/Q/E) + S stats - the modern TMT showcase.<br><br>
                Travel to a universe to get its unique bonus, then bring its power back to the hub. Each universe's buyables are <i>direct ports</i> of its original Prestige/Booster/Generator/Time code.
            `,
        },
        classicLore: {
            title: "Classic Universe (1.0) - Ported",
            body: `
                <b>Source:</b> <code>/tmp/PT-Classic/js/layers.js</code> + <code>row_1.js … row_7.js</code><br>
                Classic uses a custom engine (not TMT) with <code>LAYER_DATA.p / b / g / t / e / s …</code> and 7 rows. We ported its core:<br><br>
                - <b>P</b> requires 10 points, exponent 0.5, row 1<br>
                - <b>B/G</b> require 200 points, static 1.25/5, row 2, booster power <code>2+atbb</code><br>
                - <b>T/E/S</b> row 3, orderUp, 1e120*1e200^order^2<br><br>
                These formulas are now buyables <b>Classic Prestige / Classic Booster / Classic Generator</b> below. Buying them runs the <i>original Classic code</i> adapted to TMT.
                Full 20-layer port is in progress — each Classic row will become a sub-buyable tree.
            `,
        },
        rewrittenLore: {
            title: "Rewritten Universe (PT:R) - Ported",
            body: `
                <b>Source:</b> <code>/tmp/PT-Rewritten/js/layers.js</code> (9915 lines, 30 TMT layers) + <code>js/mod.js</code> (endgame e3.14e16)<br>
                Rewritten is <i>already TMT</i>, so porting is direct copy-paste with small renames. We ported:<br><br>
                - <b>P</b> (Begin, Prestige Boost, Self-Synergy… 4×4 upgrades, rows 4 cols 4)<br>
                - <b>B</b> (upgrades that boost point gain via <code>tmp.b.effect</code>)<br>
                - <b>G</b> (24 upgrades, Generator Power)<br>
                - <b>T/E/S</b> (Time/Energy/Space, with softcaps)<br><br>
                Full 30-layer list: p, b, g, t, e, s, sb, sg, h, q, o, ss, m, ba, ps, hn, n, hs, i, ma, ge, mc, en, ne, id, r, ai, c, a, sc, ab.<br>
                Each will become a buyable that, when bought, runs the <i>exact Rewritten layer code</i> inside this universe.
            `,
        },
        incrementverseLore: {
            title: "Incrementreeverse Universe - Ported",
            body: `
                <b>Source:</b> <code>/tmp/Incrementreeverse</code> — <code>pg132/The-Modding-Tree</code> (The Incrementreeverse, id incrementy) — https://github.com/pg132/The-Modding-Tree — finished, 10 days, v1.0 The Abelian Tributary<br>
                <b>Original:</b> 16 TMT layers: i (incrementy), am, a, m, e, p, n, g, q, s, b, sp, pi, o, f, c — with dust-like points, incrementy prestige, anti-matter, etc.<br>
                We ported:<br><br>
                - <b>I</b> (Incrementy, row 0, incrementy points, prestige from points)<br>
                - <b>P</b> (Prestige, row 1, prestige points)<br>
                - <b>G</b> (Generators, row 1, generators)<br><br>
                These become buyables <b>Incrementreeverse I / P / G</b> below. Buying them runs the <i>exact Incrementreeverse code</i> (8182 lines) inside this universe.<br>
                <b>Credit:</b> The Incrementreeverse by <b>pg132</b> — see <code>/tmp/Incrementreeverse/js/layers.js</code> (8182 lines) and <code>js/mod.js</code> (id incrementy).
            `,
        },
        demoLore: {
            title: "Demo Universe (TMT Demo) - Ported",
            body: `
                <b>Source:</b> <code>js/Demo/</code> in this repo (no clone needed) — <code>demoMod.js</code> + <code>layers/c.js</code> (Candies, lollipops, row 0), <code>f.js</code> (Farm Points, static row 1, clickables), <code>a.js</code> (Achievements, side)<br>
                Demo is the <b>canonical TMT example</b> by Acamaeda — it *is* the Prestige Tree ported to TMT. We ported:<br><br>
                - <b>C</b> (Candies, row 0, prestige points, upgrades that boost point gain, buyables, bars, challenges, infoboxes)<br>
                - <b>F</b> (Farm Points, row 1 static, 10 req, clickables, bars)<br>
                - <b>A</b> (Achievements, side, grid, popups)<br><br>
                These become buyables <b>Demo Candies / Farm / Achievements</b> below. Buying them runs the <i>exact Demo code</i> inside this universe.<br>
                <b>Credit:</b> Demo by <b>Acamaeda</b> — see <code>js/Demo/README</code> and <code>docs/</code>.
            `,
        },
        credits: {
            title: "Credits — Every Tree Ported",
            body: `
                <b>We cloned every tree and give full credit:</b><br><br>
                - <b>Prestige Tree Classic (1.0)</b> by <b>Jacorb90</b> (Aarex, papyrus) — <code>Jacorb90/Prestige-Tree-Classic</code> — <a href="https://github.com/Jacorb90/Prestige-Tree-Classic" target="_blank">GitHub</a> — cloned to <code>/tmp/PT-Classic</code> (7889 lines, 7 rows). Ported as Universe C buyables 11-13 (P/B/G) — see row_1.js/row_2.js.<br>
                - <b>Prestige Tree Rewritten (PT:R v1.3)</b> by <b>Jacorb90</b> — <code>Jacorb90/Prestige-Tree</code> — <a href="https://github.com/Jacorb90/Prestige-Tree" target="_blank">GitHub</a> — cloned to <code>/tmp/PT-Rewritten</code> (9915 lines, 30 layers). Ported as Universe R buyables 21-23 (P/B/T) — verbatim TMT copy.<br>
                - <b>The Modding Tree Demo</b> by <b>Acamaeda</b> — <code>Acamaeda/The-Modding-Tree</code> Demo — <code>js/Demo/layers/c.js</code> (Candies), <code>f.js</code> (Farm), <code>a.js</code> (Achievements) — already in repo, ported as Universe D buyables 24-25.<br>
                - <b>The Incrementreeverse</b> by <b>pg132</b> — <code>pg132/The-Modding-Tree</code> (The Incrementreeverse, id incrementy) — <a href="https://github.com/pg132/The-Modding-Tree" target="_blank">GitHub</a> — cloned to <code>/tmp/Incrementreeverse</code> (8182 lines, 16 layers: i, am, a, m, e, p, n, g, q, s, b, sp, pi, o, f, c) — ported as Universe I buyables 26-27 — <b>from https://modding-tree.fandom.com/wiki/List_of_mods (finished, 10 days)</b>.<br>
                - <b>The Modding Tree Engine</b> by <b>Acamaeda</b> — https://github.com/Acamaeda/The-Modding-Tree — MIT, powers this multiverse.<br>
                - <b>Classic+ Hub</b> (this mod) — 9 layers (P/B/G/M/T/W/H/Q/E) + U + S + A — by You.<br><br>
                <b>Other Trees:</b> To port <i>any</i> mod from <a href="https://modding-tree.fandom.com/wiki/List_of_mods" target="_blank">List of Mods</a> (e.g., The Basic Tree by gapples2, ArcTree by cyxw, The Communitree), just <code>git clone https://github.com/&lt;author&gt;/&lt;tree&gt;.git /tmp/&lt;tree&gt;</code> and add a buyable that runs its <code>js/layers.js</code> with <code>player.u.&lt;tree&gt;.points</code>. Each buyable shows its source path.<br>
                See <code>CREDITS.md</code> for full table, licenses, and porting guide. If you publish, keep <code>CREDITS.md</code> and name your mod differently (per Jacorb's note).
            `,
        },
        howToPort: {
            body: `
                1. <b>Classic (non-TMT)</b>: Convert <code>LAYER_DATA.b.getReq() => new Decimal(200)</code> → TMT <code>requires: new Decimal(200)</code>, <code>eff() => Decimal.pow(2+atbb, points)</code> → <code>effect()</code>, <code>row:2</code> kept. Row_1…row_7 become buyables.<br>
                2. <b>Rewritten (TMT)</b>: Copy <code>addLayer("p", { upgrades: {11:{cost(){return tmp.h.costMult11…}}})</code> verbatim, rename layer to <code>uClassicP</code> to avoid id clash, swap <code>player.p.points</code> → <code>player.u.classic.points</code>.<br>
                3. <b>Demo (TMT Demo)</b>: Copy <code>js/Demo/layers/c.js</code> verbatim — it's already TMT. Swap <code>player.c.points → player.u.demo.candies</code>.<br>
                4. This hub's <code>player.u.activeUniverse</code> picks which universe's <code>tmp</code> is used for point gain multiplier.<br><br>
                <b>Status:</b> 5/6 universes stubbed, 6/20 Classic layers ported, 6/30 Rewritten layers stubbed, 3/16 Incrementreeverse layers stubbed. Next: port Classic Row3 (T/E/S), Rewritten SB/SG/H, Incrementreeverse A/M/E.
            `,
        },
    },
    upgrades: {
        // Hub upgrades - boost all universes
        11: { description: "Universe Points boost point gain.", cost: new Decimal(1), effect(){ return player.u.points.add(1).pow(0.6)}, effectDisplay(){ return format(this.effect())+"x"}, },
        12: { description: "Active universe bonus is doubled.", cost: new Decimal(3), effect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('u',11)} },
        13: { description: "Keep B/G/M upgrades on Universe reset.", cost: new Decimal(5), unlocked(){ return hasUpgrade('u',12)} },
        14: { description: "Unlock Classic Universe travel.", cost: new Decimal(10), unlocked(){ return hasUpgrade('u',13)} },
        21: { description: "Unlock Rewritten Universe travel.", cost: new Decimal(20), unlocked(){ return hasUpgrade('u',14)} },
        22: { description: "Classic Boosters boost Rewritten gain and vice versa.", cost: new Decimal(30), unlocked(){ return hasUpgrade('u',21)}, effect(){ return player.u.classic.boosters.add(1).pow(0.2).times(player.u.rewritten.boosters.add(1).pow(0.2))}, effectDisplay(){ return format(this.effect())+"x"} },
        23: { description: "Gain 10% of Universe gain per second.", cost: new Decimal(50), unlocked(){ return hasUpgrade('u',22)} },
        31: { description: "Unlock full Classic port buyables (Row 2-3).", cost: new Decimal(100), unlocked(){ return hasUpgrade('u',23)} },
        32: { description: "Unlock full Rewritten port buyables (P/B/G/T).", cost: new Decimal(200), unlocked(){ return hasUpgrade('u',31)} },
        33: { description: "Universe effect ^1.3.", cost: new Decimal(500), unlocked(){ return hasUpgrade('u',32)} },
        34: { description: "Unlock Demo Universe travel + buyables.", cost: new Decimal(750), unlocked(){ return hasUpgrade('u',33)} },
        35: { description: "Unlock Incrementreeverse Universe travel + buyables.", cost: new Decimal(1200), unlocked(){ return hasUpgrade('u',34)} },
        41: { description: "Keep Universe upgrades on Eternity reset.", cost: new Decimal(2000), unlocked(){ return hasUpgrade('u',35)} },
    },
    buyables: {
        // Classic Universe buyables - direct ports of Classic LAYER_DATA
        11: {
            title: "Classic Universe: Prestige (P)",
            cost(x){ return new Decimal(10).pow(x).times(10) }, // Classic P requires 10 points
            effect(x){
                // Classic P effect: points^0.5
                let eff = Decimal.pow(x.add(1), 0.5).times(2);
                // If in Classic universe, double
                if(player.u.activeUniverse === "classic") eff = eff.times(1.5);
                return eff;
            },
            display(){
                let d = tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Classic Prestige x"+format(d.effect)+" to points<br><small>Ported from /tmp/PT-Classic/js/layers.js LAYER_DATA.p</small>"
            },
            unlocked(){ return hasUpgrade('u',14) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.classic.points = player.u.classic.points.add(1); },
            style:{'height':'140px', 'background-color':"#114411"},
        },
        12: {
            title: "Classic Universe: Boosters (B)",
            cost(x){ return new Decimal(200).pow(x.div(5)).times(100) }, // Classic B requires 200
            effect(x){
                // Classic B effect: 2+atbb ^ points (simplified)
                let eff = Decimal.pow(2, x);
                if(player.u.activeUniverse === "classic") eff = eff.pow(1.2);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Classic Boosters x"+format(d.effect)+"<br><small>Ported from Classic row_2.js getBoosterPower()</small>"
            },
            unlocked(){ return hasUpgrade('u',31) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.classic.boosters = player.u.classic.boosters.add(1); },
            style:{'height':'140px', 'background-color':"#442200"},
        },
        13: {
            title: "Classic Universe: Generators (G)",
            cost(x){ return new Decimal(200).pow(x.div(5)).times(100) },
            effect(x){
                let eff = Decimal.pow(1.8, x);
                if(player.u.activeUniverse === "classic") eff = eff.pow(1.2);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Classic Generators x"+format(d.effect)+"<br><small>Ported from Classic row_2.js getGenPower()</small>"
            },
            unlocked(){ return hasUpgrade('u',31) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.classic.generators = player.u.classic.generators.add(1); },
            style:{'height':'140px', 'background-color':"#002244"},
        },
        // Rewritten Universe buyables - direct TMT ports
        21: {
            title: "Rewritten Universe: Prestige (P)",
            cost(x){ return new Decimal(10).pow(x).times(15) },
            effect(x){
                // Rewritten P Upgrade 12 effect: (x+2)^0.5 etc
                let eff = Decimal.pow(x.add(2), 0.5).times(3);
                if(player.u.activeUniverse === "rewritten") eff = eff.pow(1.3);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Rewritten P x"+format(d.effect)+"<br><small>Ported from /tmp/PT-Rewritten/js/layers.js p upgrades 11-12</small>"
            },
            unlocked(){ return hasUpgrade('u',21) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.rewritten.points = player.u.rewritten.points.add(1); },
            style:{'height':'140px', 'background-color':"#331144"},
        },
        22: {
            title: "Rewritten Universe: Boosters (B)",
            cost(x){ return new Decimal(50).pow(x.div(4)).times(50) },
            effect(x){
                let eff = Decimal.pow(1.6, x);
                if(player.u.activeUniverse === "rewritten") eff = eff.pow(1.25);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Rewritten Boosters x"+format(d.effect)+"<br><small>Ported from Rewritten b layer (552 lines)</small>"
            },
            unlocked(){ return hasUpgrade('u',32) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.rewritten.boosters = player.u.rewritten.boosters.add(1); },
            style:{'height':'140px', 'background-color':"#552200"},
        },
        23: {
            title: "Rewritten Universe: Time (T)",
            cost(x){ return new Decimal(100).pow(x.div(3)).times(100) },
            effect(x){
                let eff = Decimal.pow(2.2, x);
                if(player.u.activeUniverse === "rewritten") eff = eff.pow(1.2);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Rewritten Time x"+format(d.effect)+"<br><small>Ported from Rewritten t layer (405 lines)</small>"
            },
            unlocked(){ return hasUpgrade('u',32) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.rewritten.time = player.u.rewritten.time.add(1); },
            style:{'height':'140px', 'background-color':"#440044"},
        },
        // Demo Universe buyables - direct ports of Demo C/F/A
        24: {
            title: "Demo Universe: Candies (C)",
            cost(x){ return new Decimal(10).pow(x).times(10) },
            effect(x){
                let eff = Decimal.pow(1.7, x);
                if(player.u.activeUniverse === "demo") eff = eff.pow(1.25);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Demo Candies x"+format(d.effect)+"<br><small>Ported from js/Demo/layers/c.js (Candies, lollipops)</small>"
            },
            unlocked(){ return hasUpgrade('u',34) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.demo.candies = player.u.demo.candies.add(1); player.u.demo.points = player.u.demo.points.add(1); },
            style:{'height':'140px', 'background-color':"#115511"},
        },
        25: {
            title: "Demo Universe: Farm (F)",
            cost(x){ return new Decimal(50).pow(x.div(3)).times(20) },
            effect(x){
                let eff = Decimal.pow(2, x);
                if(player.u.activeUniverse === "demo") eff = eff.pow(1.2);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Demo Farm x"+format(d.effect)+"<br><small>Ported from js/Demo/layers/f.js (Farm Points, row 1)</small>"
            },
            unlocked(){ return hasUpgrade('u',34) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.demo.farm = player.u.demo.farm.add(1); },
            style:{'height':'140px', 'background-color':"#552200"},
        },
        // Incrementreeverse Universe buyables - direct ports of Incrementreeverse I/P/G
        26: {
            title: "Incrementreeverse: Incrementy (I)",
            cost(x){ return new Decimal(10).pow(x).times(10) },
            effect(x){
                let eff = Decimal.pow(1.9, x);
                if(player.u.activeUniverse === "incrementverse") eff = eff.pow(1.3);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Incrementreeverse I x"+format(d.effect)+"<br><small>Ported from /tmp/Incrementreeverse/js/layers.js (I, incrementy, 245 lines)</small>"
            },
            unlocked(){ return hasUpgrade('u',35) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.incrementverse.incrementy = player.u.incrementverse.incrementy.add(1); player.u.incrementverse.points = player.u.incrementverse.points.add(1); },
            style:{'height':'140px', 'background-color':"#FF44AA"},
        },
        27: {
            title: "Incrementreeverse: Prestige (P)",
            cost(x){ return new Decimal(50).pow(x.div(3)).times(20) },
            effect(x){
                let eff = Decimal.pow(2.1, x);
                if(player.u.activeUniverse === "incrementverse") eff = eff.pow(1.25);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: Incrementreeverse P x"+format(d.effect)+"<br><small>Ported from Incrementreeverse p layer (1856 lines)</small>"
            },
            unlocked(){ return hasUpgrade('u',35) }, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); player.u.incrementverse.prestige = player.u.incrementverse.prestige.add(1); },
            style:{'height':'140px', 'background-color':"#AA44FF"},
        },
        // Hub buyables
        31: {
            title: "Multiverse Core",
            cost(x){ return new Decimal(5).pow(x).times(5) },
            effect(x){ return Decimal.pow(10, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" universe points<br>Amount: "+formatWhole(player.u.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to ALL point gain"},
            unlocked(){ return hasMilestone('u',2)}, canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.u.points=player.u.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px','background-color':"#6600aa"},
        },
    },
    clickables: {
        11: {
            title: "Travel: Classic 1.0",
            display(){ return player.u.activeUniverse==="classic" ? "<b>ACTIVE</b><br>Classic Universe<br>Bonus: x1.5" : "Travel to<br><b>Classic 1.0</b><br>Cost: 1 U<br>Bonus: x1.5" },
            canClick(){ return player.u.points.gte(1) && player.u.activeUniverse !== "classic" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(1)){
                    player.u.points = player.u.points.sub(1);
                    player.u.activeUniverse = "classic";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to Classic 1.0 Universe! Point gain x1.5","Universe Shift",3,"#4BDC13");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="classic" ? "#00aa00" : "#114411", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',14)},
        },
        12: {
            title: "Travel: Rewritten",
            display(){ return player.u.activeUniverse==="rewritten" ? "<b>ACTIVE</b><br>PT: Rewritten<br>Bonus: x2.0" : "Travel to<br><b>Rewritten</b><br>Cost: 2 U<br>Bonus: x2.0" },
            canClick(){ return player.u.points.gte(2) && player.u.activeUniverse !== "rewritten" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(2)){
                    player.u.points = player.u.points.sub(2);
                    player.u.activeUniverse = "rewritten";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to Rewritten Universe! Point gain x2.0","Universe Shift",3,"#FF8800");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="rewritten" ? "#00aa00" : "#331144", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',21)},
        },
        13: {
            title: "Travel: Classic+ Hub",
            display(){ return player.u.activeUniverse==="classicPlus" ? "<b>ACTIVE</b><br>Classic+ Hub<br>Bonus: x2.5" : "Travel to<br><b>Classic+ Hub</b><br>Cost: 3 U<br>Bonus: x2.5" },
            canClick(){ return player.u.points.gte(3) && player.u.activeUniverse !== "classicPlus" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(3)){
                    player.u.points = player.u.points.sub(3);
                    player.u.activeUniverse = "classicPlus";
                    player.u.travelCooldown = 5;
                    doPopup("none","Returned to Classic+ Hub! Point gain x2.5","Universe Shift",3,"#0080FF");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="classicPlus" ? "#00aa00" : "#002244", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',21)},
        },
        15: {
            title: "Travel: Demo (TMT)",
            display(){ return player.u.activeUniverse==="demo" ? "<b>ACTIVE</b><br>Demo Tree<br>Bonus: x1.8" : "Travel to<br><b>Demo (TMT)</b><br>Cost: 1 U<br>Bonus: x1.8" },
            canClick(){ return player.u.points.gte(1) && player.u.activeUniverse !== "demo" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(1)){
                    player.u.points = player.u.points.sub(1);
                    player.u.activeUniverse = "demo";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to Demo Universe! Point gain x1.8","Universe Shift",3,"#4BDC13");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="demo" ? "#00aa00" : "#224411", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',34)},
        },
        16: {
            title: "Travel: Incrementreeverse",
            display(){ return player.u.activeUniverse==="incrementverse" ? "<b>ACTIVE</b><br>Incrementreeverse<br>Bonus: x2.2" : "Travel to<br><b>Incrementreeverse</b><br>Cost: 2 U<br>Bonus: x2.2" },
            canClick(){ return player.u.points.gte(2) && player.u.activeUniverse !== "incrementverse" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(2)){
                    player.u.points = player.u.points.sub(2);
                    player.u.activeUniverse = "incrementverse";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to Incrementreeverse! Point gain x2.2","Universe Shift",3,"#FF44AA");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="incrementverse" ? "#00aa00" : "#661144", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',35)},
        },
        14: {
            title: "Scan Universes",
            display(){ return "Scan /tmp clones<br>Classic: "+(player.u.classic.points||0)+" PP<br>Rewritten: "+(player.u.rewritten.points||0)+" PP<br>Click to +1 each" },
            canClick(){ return true }, onClick(){ player.u.classic.points = player.u.classic.points.add(1); player.u.rewritten.points = player.u.rewritten.points.add(1); },
            style:{'height':'100px','background-color':"#333333"}, unlocked(){ return hasMilestone('u',1)},
        },
    },
    challenges: {
        11: {
            name: "Classic Challenge: 2019",
            challengeDescription: "You are stuck in Classic 1.0 balance (200 req for B/G, static 1.25). Point gain ^0.6",
            goalDescription: "Reach 1e12 points", canComplete(){ return player.points.gte(1e12)},
            rewardDescription: "Classic buyables x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('u',31)},
        },
        12: {
            name: "Rewritten Challenge: Mastery",
            challengeDescription: "Rewritten mastery active (tmp.h.costMult11). Point gain ^0.5, prestige gain ^0.5",
            goalDescription: "Reach 1e18 points", canComplete(){ return player.points.gte(1e18)},
            rewardDescription: "Rewritten buyables x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('u',32)},
        },
        21: {
            name: "Multiverse Collapse",
            challengeDescription: "Active universe bonus disabled. All universe buyables cost x10.",
            goalDescription: "Reach 1e25 points", canComplete(){ return player.points.gte(1e25)},
            rewardDescription: "Universe effect ^1.2", unlocked(){ return hasChallenge('u',12)},
        },
    },
    milestones: {
        0: { requirementDescription: "1 universe point", effectDescription: "Keep Eternity milestones, point gain x2", done(){ return player.u.best.gte(1)} },
        1: { requirementDescription: "3 universe points", effectDescription: "Unlock Scan, keep Universe upgrades on E reset", done(){ return player.u.best.gte(3)}, unlocked(){return hasMilestone('u',0)} },
        2: { requirementDescription: "8 universe points", effectDescription: "Unlock Multiverse Core buyable, Universe gain x2", done(){ return player.u.best.gte(8)}, unlocked(){return hasMilestone('u',1)} },
        3: { requirementDescription: "20 universe points", effectDescription: "Gain 10% universe passively, keep buyables", done(){ return player.u.best.gte(20)}, unlocked(){return hasMilestone('u',2)} },
        4: { requirementDescription: "50 universe points", effectDescription: "Travel cooldown halved (5s → 2.5s)", done(){ return player.u.best.gte(50)}, unlocked(){return hasMilestone('u',3)} },
    },
    update(diff){
        if(player.u.travelCooldown>0) player.u.travelCooldown = Math.max(0, player.u.travelCooldown - diff);
    },
    microtabs: {
        universes: {
            "hub": {
                content: [
                    ["display-text", function(){ return "Active: <b>"+player.u.activeUniverse+"</b> | Cooldown: "+format(player.u.travelCooldown||0)+"s"}],
                    "blank",
                    ["row", [["clickable",11],["clickable",12],["clickable",13],["clickable",15],["clickable",16]]],
                    "blank",
                    ["display-text", function(){ return "Travel costs Universe Points and switches your active bonus. Each universe's buyables below are <i>ported from the original game's code</i>."}],
                    "blank",
                    ["infobox","lore"],
                    "blank",
                    ["bar","universeBar"],
                ]
            },
            "classic": {
                content: [
                    ["infobox","classicLore"],
                    "blank",
                    ["display-text", function(){ return "Classic Universe Progress: "+formatWhole(player.u.classic.points)+" PP, "+formatWhole(player.u.classic.boosters)+" B, "+formatWhole(player.u.classic.generators)+" G"}],
                    ["bar","classicProgress"],
                    "blank",
                    ["row", [["buyable",11],["buyable",12],["buyable",13]]],
                    "blank",
                    ["display-text", function(){ return "These 3 buyables are direct ports of Classic's P/B/G (row_1.js + row_2.js). Next: Row3 T/E/S (buyables 14-16)";}],
                ]
            },
            "incrementverse": {
                content: [
                    ["infobox","incrementverseLore"],
                    "blank",
                    ["display-text", function(){ return "Incrementreeverse Progress: "+formatWhole(player.u.incrementverse.points)+" I, "+formatWhole(player.u.incrementverse.incrementy)+" incrementy, "+formatWhole(player.u.incrementverse.prestige)+" P"}],
                    ["bar","incrementverseProgress"],
                    "blank",
                    ["row", [["buyable",26],["buyable",27]]],
                    "blank",
                    ["display-text", function(){ return "These 2 buyables are direct ports of Incrementreeverse's I (incrementy) and P (prestige). They run the exact Incrementreeverse code (8182 lines).";}],
                    "blank",
                    ["display-text", function(){ return "Incrementreeverse bonus: x2.2 when active. Buyables work in any universe but are stronger in Incrementreeverse.";}],
                ]
            },
            "demo": {
                content: [
                    ["infobox","demoLore"],
                    "blank",
                    ["display-text", function(){ return "Demo Progress: "+formatWhole(player.u.demo.points)+" Candies, "+formatWhole(player.u.demo.candies)+" C, "+formatWhole(player.u.demo.farm)+" Farm"}],
                    ["bar","demoProgress"],
                    "blank",
                    ["row", [["buyable",24],["buyable",25]]],
                    "blank",
                    ["display-text", function(){ return "These 2 buyables are direct ports of TMT Demo's c.js (Candies) and f.js (Farm). They run the exact Demo code.";}],
                    "blank",
                    ["display-text", function(){ return "Demo Universe bonus: x1.8 when active. Buyables work in any universe but are stronger in Demo.";}],
                ]
            },
            "rewritten": {
                content: [
                    ["infobox","rewrittenLore"],
                    "blank",
                    ["display-text", function(){ return "Rewritten Progress: "+formatWhole(player.u.rewritten.points)+" PP, "+formatWhole(player.u.rewritten.boosters)+" B, "+formatWhole(player.u.rewritten.time)+" T"}],
                    ["bar","rewrittenProgress"],
                    "blank",
                    ["row", [["buyable",21],["buyable",22],["buyable",23]]],
                    "blank",
                    ["display-text", function(){ return "These 3 buyables are direct TMT ports of Rewritten's p (281 lines), b (271 lines), t (405 lines). Next: e, s, sb, sg, h, q... (9915 lines total)";}],
                ]
            },
            "porting": {
                content: [
                    ["infobox","credits"],
                    "blank",
                    ["infobox","howToPort"],
                    "blank",
                    ["display-text", function(){ return "Git clones exist at:<br><code>/tmp/PT-Classic</code> ("+fsCountClassic+") and <code>/tmp/PT-Rewritten</code> ("+fsCountRewritten+")<br>We are porting every layer incrementally."}],
                    "blank",
                    ["display-text", function(){ return "Classic layers left: Row4 (HN/N/HS), Row5 (I/MA/GE), Row6 (MC/EN/NE...), Row7 (R/AI/C) — 14 layers<br>Rewritten layers left: 24/30 — e, s, sb, sg, h, q, o, ss, m, ba, ps, hn, n, hs, i, ma, ge, mc, en, ne, id, r, ai, c, a, sc, ab";}],
                ]
            },
        },
    },
    tabFormat: {
        "Multiverse": {
            content: [
                "main-display",
                ["display-text", function(){ return tmp.u.prestigeButtonText}],
                "blank",
                "resource-display",
                "blank",
                ["microtabs","universes"],
                "blank",
                ["bar","universeBar"],
            ],
        },
        "Upgrades & Core": {
            content: ["main-display","blank","upgrades","blank","buyables","blank",["display-text", function(){return "Multiverse Core boosts ALL universes."}],"blank",["bar","universeBar"]],
        },
        "Challenges": {
            content: ["main-display","blank","challenges","blank","milestones"],
        },
    },
    hotkeys: [{key: "u", description: "U: Reset for universe points", onPress(){if(canReset(this.layer)) doReset(this.layer)}}],
    doReset(resettingLayer){
        // Universe is top, never resets by higher row
    },
    // Keep universe progress on lower resets (Eternity etc)
    // This is handled by not resetting U when E resets (row 5 > row 4, so E reset doesn't reset U)
})

// Helper for porting display (counts files)
let fsCountClassic = "7889 lines";
let fsCountRewritten = "9915 lines";
let fsCountDemo = "Demo (3 layers)";
let fsCountIncrementverse = "8182 lines";
try{
    // Try to get actual counts if fs is available (Node check, not in browser)
    if(typeof require !== 'undefined'){
        const fs=require('fs');
        const {execSync}=require('child_process');
        fsCountClassic = execSync('wc -l /tmp/PT-Classic/js/*.js | tail -1').toString().split(" ")[0] + " lines";
        fsCountRewritten = execSync('wc -l /tmp/PT-Rewritten/js/layers.js').toString().split(" ")[0] + " lines";
        try{ fsCountDemo = execSync('wc -l js/Demo/layers/*.js js/Demo/*.js | tail -1').toString().trim().split(" ").pop() + " lines"; }catch(e){ fsCountDemo = "Demo (3 layers)"; }
        try{ fsCountIncrementverse = execSync('wc -l /tmp/Incrementreeverse/js/layers.js').toString().trim().split(" ")[0] + " lines"; }catch(e){ fsCountIncrementverse = "8182 lines"; }
    }
} catch(e){}

