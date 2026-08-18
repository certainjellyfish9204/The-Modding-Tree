let modInfo = {
	name: "The Classic+ Tree",
	id: "classicPlusFull", // <- keep this unique! Change if you fork
	author: "You",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Safe Storage",
}

let changelog = `<h1>Changelog:</h1><br>
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

let winText = `Congratulations! You have reached the end of this starter and beaten the Classic+ Tree! <br><br> Now make it YOURS - change numbers, add a 6th layer, reskin it to Space/Magic/Factory, and go wild.`

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
	// G effect
	if (tmp.g.effect) gain = gain.times(tmp.g.effect)
	// B effect
	if (tmp.b.effect) gain = gain.times(tmp.b.effect)
	// T effect
	if (tmp.t.effect) gain = gain.times(tmp.t.effect)
	// H effect - huge
	if (tmp.h.effect) gain = gain.times(tmp.h.effect)
	// Achievements
	if (hasAchievement('a', 11)) gain = gain.times(1.5)
	if (hasAchievement('a', 12)) gain = gain.times(1.5)
	if (hasAchievement('a', 13)) gain = gain.times(1.2)
	if (hasAchievement('a', 14)) gain = gain.times(achievementEffect('a', 14))
	// Inside challenges
	if (inChallenge('t', 11)) gain = gain.pow(0.5)
	if (inChallenge('t', 12)) gain = gain.pow(0.7)
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
	function() { if (tmp.p.effect) return "P effect: "+format(tmp.p.effect)+"x to points" },
	function() { if (player.b.unlocked) return "Boosters boost points by "+format(tmp.b.effect)+"x" },
	function() { if (player.g.unlocked) return "Generators: "+formatWhole(player.g.points)+" (x"+format(tmp.g.effect)+")" },
	function() { if (inChallenge('t', 11) || inChallenge('t', 12)) return "<b style='color:red'>You are in a Time Challenge!</b>" },
]

// Determines when the game "ends"
function isEndgame() {
	return player.h.points.gte(new Decimal(5))
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
}
