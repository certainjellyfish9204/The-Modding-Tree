let modInfo = {
	name: "The Classic+ Tree",
	id: "classicPlusFull", // <- keep this unique! Change if you fork
	author: "You",
	pointsName: "points",
	modFiles: ["layers.js", "layers/universe.js", "layers/reality.js", "layers/singularity.js", "layers/omniverse.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.8",
	name: "The Omniverse & Expanded Multiverse",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.8 - The Omniverse & Expanded Multiverse (Developer Preview)</h3><br>
		- <b>NEW ROW 7: The Omniverse (Ω / O)</b> — the ultimate metaphysical layer above Singularity, transcending all multiverse timelines into pure Omniverse Energy.<br>
		- <b>4x4 Omni-Matrix Grid</b> (16 cosmic synthesis cells) — synthesize Void (🌌) → Particle (⚛️) → Energy (💠) → Singulon (🔮) → Omniverse (👑) for monumental exponential multipliers.<br>
		- <b>4 Omniverse Cores (Buyables)</b>: Cosmic Synthesizer (point & Singularity multiplier), Dimensional Loom (O energy multiplier), Chrono-Nexus (Field speed), and Infinity Engine (overall exponent booster).<br>
		- <b>15 Omniverse Upgrades</b>: Transfinite Awakening, Multiverse Synthesis, Reality-Singularity Bridge, Cosmic Field, Omni-Matrix Unlocked, Core Resonance, Transfinite Rift, Automated Synthesis, Multiverse Transcendence, Omnipresent Horizon, Ultimate Compression, Temporal Transcendence, Cosmological Constant, Omniverse Singularity Loop, The Absolute Omega.<br>
		- <b>4 Omega Challenges</b>: Omega Void (^0.02 power limit), Paradox Matrix (disabled Reality & Singularity), Chrono-Freeze (10% game speed), and Grand Omega Multiverse (all penalties combined).<br>
		- <b>8 Omniverse Milestones</b>: Automated Singularity resets, passive Singularity gain (100%/s), automatic Omni-Grid synthesis, and Transcendent Victory at 50 O.<br>
		- <b>5 NEW COMMUNITY UNIVERSES (12 Total in Multiverse Hub!)</b>:<br>
			• <b>Universe DIM (PT: Dimensions by loader3229)</b> — 10488 lines, Spatial Shards, Dimension 1-2, Dimension Boost, x2.5 active bonus.<br>
			• <b>Universe PART (The Particle Increment Tree by cokecole526)</b> — 614 lines, Electrons, Protons, Neutrons, Quarks, x2.6 active bonus.<br>
			• <b>Universe PRO (The Pro Tree by chuangyou123)</b> — 240,000+ lines (40+ layers), Ants, Grass, Supernova Core, Void Energy, x2.8 active bonus.<br>
			• <b>Universe DICE (The Dice Tree by chuangyou123)</b> — 60649 lines, D6/D12/D20 Rollers, Pip Multipliers, Luck Charm, x3.0 active bonus.<br>
			• <b>Universe NG (PT: Rewritten NG+ by Seder3214)</b> — 12492 lines, NG+ Boosters, Meta-Generators, Hyper-Time Warp, x3.2 active bonus.<br>
			• Alongside Classic 1.0, PT: Rewritten, TMT Demo, Incrementreeverse, The Basic Tree, The Milestone Tree, and Classic+ Hub.<br>
		- <b>Core Layer Expansions</b>: Reality upgrades 33-34 and Omni Dimension buyable; Singularity Singular Horizon buyable and Omnipresent Rift challenge; expanded Mastery side layer tracking all 13 core layers and 12 universes.<br>
		- <b>25+ New Achievements (Rows 22-24)</b>: Omniverse Awakened, Matrix Synthesizer, Grand Omega Conqueror, Master of Twelve Realms, and Transfinite Milestones.<br>
		- <b>Official Save Bank Expanded</b>: Added premade saves for Omniverse Start, Dimensions Tree, Particle Tree, Pro Tree, Dice Tree, NG+ Tree, and 100% Mastery Endgame.<br>
		- <i>Developer Preview — Balance and endgame tuning in progress!</i><br><br>
	<h3>v0.7.5 - Buy Max Everything (below Eternity)</h3><br>
		- <b>Every buyable below Eternity (P, B, G, M, T, W, H, Q) is now buy-maxable</b>: click buys as many levels as you can afford, Shift+click buys a single level.<br>
		- Static layers below Eternity now buy max on prestige: B no longer needs milestone 2, and H + Q get it from the start.<br>
		- B milestone 2 (6 boosters) reworked to "B cost /1.5" since buy max is free now.<br>
		- Eternity and above (E, U, R, S) are unchanged - still one at a time.<br><br>
	<h3>v0.7.4 - Notation & Save Fixes</h3><br>
		- Fixed Eternal Notations factory presets (Simplified Written and Numeric Dominoes).<br>
		- Fixed Warp upgrade 32 auto-reset loop by adding an ON/OFF toggle on Warp milestone 1.<br><br>
	<h3>v0.7 - Singularity & Mastery</h3><br>
		- <b>NEW ROW 6: Singularity (S)</b> — the ultimate endgame layer, merging Universe (U) and Reality (R) branches.<br>
		- Collapse Grid (3x3), Singularity Field, Rift Challenges, Singulon Cores.<br>
		- Mastery side layer (MA) tracking game completion percentage.<br><br>
	<h3>v0.6 - Fractured Reality</h3><br>
		- <b>NEW ROW 5 BRANCH: Reality (R)</b> — Reality Shards, Stability, Dimension buyables.<br><br>
	<h3>v0.5 - Eternal Notations (by MathCookie17)</h3><br>
		- 146 Notation options including Colored Dominoes, Scientific, Infinity, Eternity.<br><br>
	<h3>v0.4 - Multiverse (Universe Layer)</h3><br>
		- Universe travel and ported community trees.<br><br>
	<h3>v0.3 - Way More Content</h3><br>
		- Mana, Warp, Quantum, Eternity layers added.<br><br>
	<h3>v0.1 - The Classic+ Starter</h3><br>
		- Initial 5 layers.<br>`

let winText = `Congratulations! You have mastered the Classic+ Tree v0.8 — THE OMNIVERSE & EXPANDED MULTIVERSE! <br><br> You attained 50 Omniverse Energy, mastered all 12 community multiverse realms, conquered the Omni-Matrix, or surpassed 1e1000 points. You have achieved complete Transcendent Omnipotence.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
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
	if (tmp.u && tmp.u.effect && !(player.r && inChallenge('r', 11)) && !(player.o && inChallenge('o', 12))) gain = gain.times(tmp.u.effect)
	if (tmp.r && tmp.r.effect && !inChallenge('r', 11) && !(player.o && inChallenge('o', 12))) gain = gain.times(tmp.r.effect)
	if (player.r && hasUpgrade('r', 11)) gain = gain.times(upgradeEffect('r', 11))
	if (player.r && hasMilestone('r', 0)) gain = gain.times(2)
	if (player.r && hasUpgrade('r', 34)) gain = gain.times("1e100")
	// Row 6 - Singularity
	if (player.s2 && player.s2.unlocked && !(player.o && inChallenge('o', 12))) {
		if (tmp.s2 && tmp.s2.effect) gain = gain.times(tmp.s2.effect)
		try { if (layers.s2 && typeof layers.s2.getGridEffect === 'function') gain = gain.times(layers.s2.getGridEffect()) } catch(e) {}
		if (hasUpgrade('s2', 13)) gain = gain.times("1e50")
		if (hasUpgrade('s2', 14) && player.s2.field) gain = gain.times(player.s2.field.add(1).pow(0.5))
		if (hasUpgrade('s2', 33)) gain = gain.pow(1.5)
		try { if (typeof buyableEffect === 'function' && tmp.s2 && tmp.s2.buyables && tmp.s2.buyables[12]) gain = gain.times(buyableEffect('s2', 12)) } catch(e) {}
		try { if (typeof buyableEffect === 'function' && tmp.s2 && tmp.s2.buyables && tmp.s2.buyables[13]) gain = gain.times(buyableEffect('s2', 13)) } catch(e) {}
	}
	// Row 7 - The Omniverse (Ω)
	if (player.o && player.o.unlocked) {
		if (tmp.o && tmp.o.effect) gain = gain.times(tmp.o.effect)
		try { if (layers.o && typeof layers.o.getGridEffect === 'function') gain = gain.times(layers.o.getGridEffect()) } catch(e) {}
		if (hasUpgrade('o', 14) && player.o.field) gain = gain.times(player.o.field.add(1).pow(0.5))
		if (hasUpgrade('o', 43)) gain = gain.times("1e500")
		if (hasMilestone('o', 0)) gain = gain.times(10)
		if (hasMilestone('o', 6)) gain = gain.pow(1.2)
		if (hasChallenge('o', 14)) gain = gain.times("1e100")
		try { if (typeof buyableEffect === 'function' && tmp.o && tmp.o.buyables && tmp.o.buyables[11]) gain = gain.times(buyableEffect('o', 11)) } catch(e) {}
	}
	// Buyable point boosts
	if (tmp.g.buyables && tmp.g.buyables[12]) gain = gain.times(buyableEffect('g', 12))
	if (tmp.m.buyables && tmp.m.buyables[12]) gain = gain.times(buyableEffect('m', 12))
	if (tmp.u && tmp.u.buyables && tmp.u.buyables[11]) gain = gain.times(buyableEffect('u', 11).pow(0.1))
	if (tmp.r && tmp.r.buyables && tmp.r.buyables[11]) gain = gain.times(buyableEffect('r', 11))
	if (tmp.r && tmp.r.buyables && tmp.r.buyables[13]) gain = gain.times(buyableEffect('r', 13))
	// Achievements
	if (hasAchievement('a', 11)) gain = gain.times(1.5)
	if (hasAchievement('a', 12)) gain = gain.times(1.5)
	if (hasAchievement('a', 13)) gain = gain.times(1.2)
	if (hasAchievement('a', 14)) gain = gain.times(achievementEffect('a', 14))
	if (hasAchievement('a', 15)) gain = gain.times(1.3)
	if (hasAchievement('a', 16)) gain = gain.times(1.3)
	if (hasAchievement('a', 31)) gain = gain.times(1.5)
	if (hasAchievement('a', 32)) gain = gain.times(2)
	if (hasAchievement('a', 91)) gain = gain.times(achievementEffect('a', 91))
	if (hasAchievement('a', 92)) gain = gain.times(achievementEffect('a', 92))
	if (hasAchievement('a', 93)) gain = gain.times(achievementEffect('a', 93))
	if (hasAchievement('a', 96)) gain = gain.times(achievementEffect('a', 96))
	if (hasMilestone('p', 4)) gain = gain.times(2)
	if (hasMilestone('b', 5)) gain = gain.times(3)
	if (hasAchievement('a', 33)) gain = gain.pow(1.05)
	// Challenge debuffs
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
	if (player.s2 && inChallenge('s2', 11)) gain = gain.pow(0.15)
	if (player.s2 && inChallenge('s2', 12)) gain = gain.pow(0.05)
	if (player.s2 && inChallenge('s2', 22)) gain = gain.pow(0.1)
	if (player.o && inChallenge('o', 11)) gain = gain.pow(0.2)
	if (player.o && inChallenge('o', 13)) gain = gain.pow(0.1)
	if (player.o && inChallenge('o', 14)) gain = gain.pow(0.05)
	return gain
}

function addedPlayerData() {
	return {}
}

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
	function() { if (player.g.unlocked || hasMilestone('p', 4)) return "<b style='color:#7fd4ff'>💡 Buyables: click = buy max, Shift+click = buy one (everything below Eternity)</b>" },
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
	function() { if (player.o && player.o.unlocked) return "Ω: "+format(tmp.o.effect)+"x | "+formatWhole(player.o.points)+" omniverse energy | Field: "+format(player.o.field) },
	function() { if (inChallenge('t', 11) || inChallenge('t', 12) || inChallenge('t', 21) || inChallenge('w', 11) || inChallenge('q', 11) || inChallenge('e', 11) || (player.u && inChallenge('u',11)) || (player.r && (inChallenge('r',11) || inChallenge('r',12))) || (player.s2 && (inChallenge('s2',11) || inChallenge('s2',12) || inChallenge('s2',21) || inChallenge('s2',22))) || (player.o && (inChallenge('o',11) || inChallenge('o',12) || inChallenge('o',13) || inChallenge('o',14)))) return "<b style='color:red; background:#330000; padding:1px 6px'>⚠️ In Challenge!</b>" },
]

// Determines when the game "ends"
function isEndgame() {
	return (player.o && player.o.points.gte(new Decimal(50))) ||
	       (player.s2 && player.s2.points.gte(new Decimal(50))) ||
	       (player.u && player.u.points.gte(new Decimal(100))) ||
	       (player.r && player.r.points.gte(new Decimal(50))) ||
	       player.points.gte(new Decimal("1e1000"))
}

var backgroundStyle = {}

function maxTickLength() {
	return 3600
}

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
		if (player.u && !player.u.basic) player.u.basic = { points: new Decimal(0), cheapeners: new Decimal(0), darkness: new Decimal(0), exponents: new Decimal(0), funity: new Decimal(0), games: new Decimal(0) };
		if (player.u && !player.u.miletree) player.u.miletree = { points: new Decimal(0), prestige: new Decimal(0), superPrestige: new Decimal(0), transcend: new Decimal(0), reincarnate: new Decimal(0) };
	}
	if (oldVersion < "0.8") {
		if (!player.o) player.o = getStartLayerData("o");
		if (player.o && player.o.field === undefined) player.o.field = new Decimal(0);
		if (player.o && player.o.syntheses === undefined) player.o.syntheses = 0;
		if (player.o && player.o.pulseTimer === undefined) player.o.pulseTimer = 0;
		if (player.u && !player.u.dimensions) player.u.dimensions = { points: new Decimal(0), dim1: new Decimal(0), dim2: new Decimal(0), dimBoost: new Decimal(0) };
		if (player.u && !player.u.particles) player.u.particles = { points: new Decimal(0), electrons: new Decimal(0), protons: new Decimal(0), neutrons: new Decimal(0), quarks: new Decimal(0) };
		if (player.u && !player.u.pro) player.u.pro = { points: new Decimal(0), ants: new Decimal(0), grass: new Decimal(0), supernova: new Decimal(0), void: new Decimal(0) };
		if (player.u && !player.u.dice) player.u.dice = { points: new Decimal(0), d6: new Decimal(0), d12: new Decimal(0), d20: new Decimal(0), luck: new Decimal(0) };
		if (player.u && !player.u.ng) player.u.ng = { points: new Decimal(0), ngBoosters: new Decimal(0), metaGenerators: new Decimal(0), hyperTime: new Decimal(0) };
	}
}
