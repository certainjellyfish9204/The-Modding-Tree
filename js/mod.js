let modInfo = {
	name: "The Classic+ Tree",
	id: "classicPlusFull", // <- keep this unique! Change if you fork
	author: "You",
	pointsName: "points",
	modFiles: ["layers.js", "layers/universe.js", "layers/reality.js", "layers/singularity.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.7",
	name: "Singularity",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.7 - Singularity (Developer Preview)</h3><br>
		- <b>NEW ROW 6: Singularity (S)</b> — the ultimate endgame layer, merging Universe (U) and Reality (R) branches<br>
		- Singularities collapse all multiverse timelines into a single point of infinite power<br>
		- <b>Collapse Grid</b> (3x3) — compress tiles (⬛→🔮→✦) for exponential bonuses. Grid Mastery auto-compresses.<br>
		- <b>Singularity Field</b> — passive multiplier that grows over time (unlocks at S upgrade 14)<br>
		- <b>10 upgrades</b>: Timeline Collapse, Dimensional Crunch, Multiverse Merge, Singularity Field, Collapse Grid, Singulon Amplifier, Rift Breaker, Eternal Singularity, Grid Mastery, Absolute Singularity<br>
		- <b>2 buyables</b>: Singulon Core (amplifies S effect), Timeline Compressor (boosts all points)<br>
		- <b>3 Rift Challenges</b>: Singularity Rift Alpha (all effects ^0.1), Rift Omega (all effects disabled), Collapsed Timeline (auto-resets)<br>
		- <b>5 milestones</b>: from 1 to 20 Singularities, culminating in ULTIMATE VICTORY<br>
		- <b>2 clickables</b>: Compress Tile (spend S to compress grid), Grid Overload (mass compress)<br>
		- New endgame: 20 Singularities, 25 U + 25 R, or 1e500 points<br>
		- <i>Developer Preview — balance may change!</i><br><br>
	<h3>v0.6 - Fractured Reality</h3><br>
		- <b>NEW ROW 5 BRANCH: Reality (R)</b> — a full second path branching directly from Eternity alongside Universe<br>
		- Reality Shards, Stability, two Dimension buyables, nine upgrades, five milestones, two Reality Fracture challenges, and automation<br>
		- Reality boosts point and Eternity gain; master the branch at 25 Reality Shards for an alternate victory<br><br>
	<h3>v0.5 - Eternal Notations (by MathCookie17) — Every Preset!</h3><br>
		- <b>Eternal Notations</b> by <b>MathCookie17</b> — <a href="https://github.com/MathCookie17/Eternal-Notations" target="_blank">GitHub</a> (MIT, <b>144 presets + 65 notations + 144 HTML presets = 288 total</b>, built on break_eternity, up to 10^^(10^308)) — <code>js/utils/eternal_notations.js</code> (1.2M, 17122 lines) + <code>.min.js</code> + updated <code>break_eternity.js</code> (now supports <code>mod</code>/<code>slog</code>)<br>
		- <b>Every preset added</b> (146 options: TMT + 145 Eternal) — including <b>HTML presets like Colored Dominoes</b> (requires <code>eternal_notations_images/dominoes.css</code> + <code>dominoes.png</code> — <b>both included</b> at <code>eternal_notations_images/</code> and loaded via <code>index.html</code> + <code>v-html</code> for points)<br>
		- <b>Options → Notation</b> switcher: TMT (default), Default, Scientific, Standard, Infinity, Eternity, Dominoes, <b>Colored Dominoes</b>, Hyperscientific, Tetration, Boundless, + 135 more — cycle via button, saved in <code>options.notation</code><br>
		- Updated <code>break_eternity.js</code> to Eternal Notations\' break_eternity (56K) — from <code>/tmp/Eternal-Notations/break_eternity stuff/break_eternity.min.js</code><br>
		- Rewrote <code>js/utils/NumberFormating.js</code> (146 NOTATIONS, 521 lines) to wrap Eternal: keeps TMT <code>formatTMT()</code> as fallback, <code>format()</code> now calls <code>currentEternalNotation.format(decimal)</code> — credit in code and <code>CREDITS.md</code><br>
		- New win: still 10 E/25 U/1e500, but now displayable as <code>1.00∞</code> / <code>֎0.001</code> / <span class="domino_box"> domino </span> with Infinity/Eternity/Colored Dominoes<br><br>
	<h3>v0.4 - Multiverse (Universe Layer) — Now with List of Mods!</h3><br>
		- <b>NEW ROW 5: Universe (U)</b> — Travel the Multiverse!<br>
		- Git cloned <code>/tmp/PT-Classic</code> (7889 lines, 7 rows), <code>/tmp/PT-Rewritten</code> (9915 lines, 30 layers), <code>/tmp/Incrementreeverse</code> (pg132, 8182 lines, 16 layers from <a href="https://modding-tree.fandom.com/wiki/List_of_mods" target="_blank">List of Mods</a>), and <code>js/Demo</code> (Acamaeda Demo) — porting every layer incrementally<br>
		- 5 playable universes: <b>Classic 1.0</b> (P/B/G), <b>Rewritten</b> (P/B/T), <b>Demo</b> (C/F), <b>Incrementreeverse</b> (I/P from Incrementreeverse, finished 10 days), <b>Classic+ Hub</b> (this mod)<br>
		- 13 new Universe upgrades, 9 Universe buyables (Classic P/B/G + Rewritten P/B/T + Demo C/F + Incrementreeverse I/P + Multiverse Core), 3 Universe challenges, 5 travel clickables<br>
		- Universe effect boosts ALL points (x5^U, x1.5/x1.8/x2/x2.2/x2.5 by active universe + progress)<br>
		- Travel cooldown, bars, infoboxes documenting porting + <b>CREDITS.md</b> with full attribution for every cloned game<br>
		- New win: still 10 Eternity, but Universe gives x1e100+ boost to push 1e500 and 25 U also wins<br><br>
	<h3>v0.3 - Way More Content (Massive Expansion)</h3><br>
		- <b>4 NEW LAYERS</b>: Mana (M, row 1), Warp (W, row 2), Quantum (Q, row 3), Eternity (E, row 4 - ENDGAME)<br>
		- <b>Stats side layer</b> (S) with lore, bars, and breakdowns<br>
		- <b>~70 new upgrades</b> across all layers, 15 new buyables, 9 new challenges, 6 new milestones per layer<br>
		- P: +7 upgrades, 2 buyables, new challenge, bar, QOL milestones<br>
		- B: +6 upgrades, 2 buyables, challenge, bar<br>
		- G: +7 upgrades, 2 buyables, grid, challenges<br>
		- T: +5 upgrades, 2 buyables, 3 new challenges, clickables<br>
		- H: +7 upgrades, 2 buyables, challenges, bar<br>
		- Achievements: 8 → 24 (including secret & grindy)<br>
		- New win: 10 Eternity Points or 1e500 points!<br><br>
	<h3>v0.2 - Safe Storage Fallback</h3><br>
		- Added localStorage fallback: if storage is blocked/full/private-mode, game now uses sessionStorage → memory fallback instead of crashing<br>
		- Shows red banner + popup when in memory-only mode (Export reminder)<br>
		- Saves are now wrapped in try/catch, auto-migrate back to localStorage when it recovers<br><br>
	<h3>v0.1 - The Classic+ Starter</h3><br>
		- 5 main layers (P, B, G, T, H) + Achievements<br>
		- Upgrades, Milestones, Buyables, Clickables, Challenges, Bars, Achievements<br>
		- Two Row-1 branches that combine into Row-2<br>
		- Try to reach 5 Hyper Points to beat the game!<br><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have mastered the Classic+ Tree v0.7 — THE SINGULARITY! <br><br> You reached 20 Singularities, 25 Universe Points, 25 Reality Shards, or 1e500 points. You collapsed all timelines into a single point of infinite power. The multiverse is yours.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	// P upgrades
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 32)) gain = gain.times(upgradeEffect('p', 32))
	// Row 1 effects
	if (tmp.g.effect) gain = gain.times(tmp.g.effect)
	if (tmp.b.effect) gain = gain.times(tmp.b.effect)
	if (tmp.m.effect) gain = gain.times(tmp.m.effect)
	// Row 2
	if (tmp.t.effect) gain = gain.times(tmp.t.effect)
	if (tmp.w.effect) gain = gain.times(tmp.w.effect)
	// Row 3
	if (tmp.h.effect) gain = gain.times(tmp.h.effect)
	if (tmp.q.effect) gain = gain.times(tmp.q.effect)
	// Row 4
	if (tmp.e.effect) gain = gain.times(tmp.e.effect)
	// Row 5 branches - Universe and Reality
	// Shattered Timeline disables both capstone effects while the challenge is active.
	if (tmp.u && tmp.u.effect && !(player.r && inChallenge('r', 11))) gain = gain.times(tmp.u.effect)
	if (tmp.r && tmp.r.effect && !inChallenge('r', 11)) gain = gain.times(tmp.r.effect)
	if (player.r && hasUpgrade('r', 11)) gain = gain.times(upgradeEffect('r', 11))
	if (player.r && hasMilestone('r', 0)) gain = gain.times(2)
	// Row 6 - Singularity
	if (tmp.s2 && tmp.s2.effect && player.s2 && player.s2.unlocked) gain = gain.times(tmp.s2.effect)
	if (layers.s2 && typeof layers.s2.getGridEffect === 'function' && player.s2 && player.s2.unlocked) gain = gain.times(layers.s2.getGridEffect())
	if (player.s2 && hasUpgrade('s2', 13)) gain = gain.times(1e50)
	if (player.s2 && hasUpgrade('s2', 14) && player.s2.field) gain = gain.times(player.s2.field.add(1).pow(0.5))
	if (player.s2 && hasUpgrade('s2', 33)) gain = gain.pow(1.5)
	if (player.s2 && buyableEffect('s2', 12)) gain = gain.times(buyableEffect('s2', 12))
	// Buyable point boosts
	if (tmp.g.buyables && tmp.g.buyables[12]) gain = gain.times(buyableEffect('g', 12))
	if (tmp.m.buyables && tmp.m.buyables[12]) gain = gain.times(buyableEffect('m', 12))
	if (tmp.u && tmp.u.buyables && tmp.u.buyables[11]) gain = gain.times(buyableEffect('u', 11).pow(0.1))
	if (tmp.r && tmp.r.buyables && tmp.r.buyables[11]) gain = gain.times(buyableEffect('r', 11))
	// Achievements
	if (hasAchievement('a', 11)) gain = gain.times(1.5)
	if (hasAchievement('a', 12)) gain = gain.times(1.5)
	if (hasAchievement('a', 13)) gain = gain.times(1.2)
	if (hasAchievement('a', 14)) gain = gain.times(achievementEffect('a', 14))
	if (hasAchievement('a', 15)) gain = gain.times(1.3)
	if (hasAchievement('a', 16)) gain = gain.times(1.3)
	if (hasAchievement('a', 31)) gain = gain.times(1.5)
	if (hasAchievement('a', 32)) gain = gain.times(2)
	// Milestone / challenge boosts
	if (hasMilestone('p', 4)) gain = gain.times(2)
	if (hasMilestone('b', 5)) gain = gain.times(3)
	if (hasAchievement('a', 33)) gain = gain.pow(1.05)
	// Inside challenges (debuffs)
	if (inChallenge('t', 11)) gain = gain.pow(0.5)
	if (inChallenge('t', 12)) gain = gain.pow(0.7)
	if (inChallenge('t', 21)) gain = gain.pow(0.6)
	if (inChallenge('w', 11)) gain = gain.pow(0.65)
	if (inChallenge('w', 12)) gain = gain.pow(0.55)
	if (inChallenge('q', 11)) gain = gain.pow(0.5)
	if (inChallenge('q', 12)) gain = gain.pow(0.4)
	if (inChallenge('e', 11)) gain = gain.pow(0.3)
	if (inChallenge('u', 11)) gain = gain.pow(0.6)
	if (inChallenge('u', 12)) gain = gain.pow(0.5)
	if (player.r && inChallenge('r', 11)) gain = gain.pow(0.35)
	if (player.r && inChallenge('r', 12)) gain = gain.pow(0.25)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() { 
		if (typeof isUsingFallbackStorage !== "undefined" && isUsingFallbackStorage()) {
			let type = (typeof getFallbackStorageType !== "undefined" ? getFallbackStorageType() : "fallback")
			if (type === "memory") return "<b style='color:#ff4444; background:#330000; padding:2px 6px; border:1px solid #ff0000'>⚠️ MEMORY-ONLY SAVE! Will be LOST on refresh — Export often! (Options → Export)</b>"
			if (type === "sessionStorage") return "<b style='color:#ffcc00; background:#332a00; padding:2px 6px; border:1px solid #ffcc00'>⚠️ Session-Only Save (closes when tab closes) — Please Export!</b>"
			return "<b style='color:orange'>⚠️ Save fallback active ("+type+")</b>"
		}
	},
	function() { if (tmp.p && tmp.p.effect) return "P: "+format(tmp.p.effect)+"x" },
	function() { if (player.b.unlocked) return "B: "+format(tmp.b.effect)+"x" },
	function() { if (player.g.unlocked) return "G: "+formatWhole(player.g.points)+" (×"+format(tmp.g.effect)+")" },
	function() { if (player.m.unlocked) return "M: "+format(tmp.m.effect)+"x" },
	function() { if (player.t.unlocked) return "T: "+format(tmp.t.effect)+"x" },
	function() { if (player.w.unlocked) return "W: "+format(tmp.w.effect)+"x" },
	function() { if (player.h.unlocked) return "H: "+format(tmp.h.effect)+"x" },
	function() { if (player.q.unlocked) return "Q: "+format(tmp.q.effect)+"x" },
	function() { if (player.e.unlocked) return "E: "+format(tmp.e.effect)+"x | "+format(player.e.points)+" Eternities" },
	function() { if (player.u && player.u.unlocked) return "U: "+format(tmp.u.effect)+"x ("+player.u.activeUniverse+") | "+formatWhole(player.u.points)+" U" },
	function() { if (player.r && player.r.unlocked) return "R: "+format(tmp.r.effect)+"x | "+formatWhole(player.r.points)+" shards | "+formatWhole(player.r.stability)+" stability" },
	function() { if (player.s2 && player.s2.unlocked) return "S: "+format(tmp.s2.effect)+"x | "+formatWhole(player.s2.points)+" singularities | Field: "+format(player.s2.field) },
	function() { if (inChallenge('t', 11) || inChallenge('t', 12) || inChallenge('t', 21) || inChallenge('w', 11) || inChallenge('q', 11) || inChallenge('e', 11) || (player.u && inChallenge('u',11)) || (player.r && (inChallenge('r',11) || inChallenge('r',12)))) return "<b style='color:red; background:#330000; padding:1px 6px'>⚠️ In Challenge!</b>" },
]

// Determines when the game "ends"
function isEndgame() {
	return (player.s2 && player.s2.points.gte(new Decimal(20))) || player.u.points.gte(new Decimal(25)) || player.r.points.gte(new Decimal(25)) || player.points.gte(new Decimal("1e500"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if (oldVersion < "0.3") {
		if (!player.m) player.m = getStartLayerData("m");
		if (!player.w) player.w = getStartLayerData("w");
		if (!player.q) player.q = getStartLayerData("q");
		if (!player.e) player.e = getStartLayerData("e");
		if (!player.s) player.s = {unlocked: true};
	}
	if (oldVersion < "0.4") {
		if (!player.u) player.u = getStartLayerData("u");
		if (player.u && !player.u.classic) player.u.classic = {points: new Decimal(0), boosters: new Decimal(0), generators: new Decimal(0)};
		if (player.u && !player.u.rewritten) player.u.rewritten = {points: new Decimal(0), boosters: new Decimal(0), time: new Decimal(0)};
		if (player.u && !player.u.demo) player.u.demo = {points: new Decimal(0), candies: new Decimal(0), farm: new Decimal(0)};
		if (player.u && !player.u.incrementverse) player.u.incrementverse = {points: new Decimal(0), incrementy: new Decimal(0), prestige: new Decimal(0)};
	}
	if (oldVersion < "0.6") {
		if (!player.r) player.r = getStartLayerData("r");
		if (player.r && player.r.stability === undefined) player.r.stability = new Decimal(0);
		if (player.r && player.r.auto === undefined) player.r.auto = false;
	}
	if (oldVersion < "0.7") {
		if (!player.s2) player.s2 = getStartLayerData("s2");
		if (player.s2 && player.s2.field === undefined) player.s2.field = new Decimal(0);
		if (player.s2 && player.s2.collapses === undefined) player.s2.collapses = 0;
		if (player.s2 && !Array.isArray(player.s2.grid)) player.s2.grid = Array(9).fill(0);
	}
}
