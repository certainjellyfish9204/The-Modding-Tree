// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		forceTooltips: true,
		hideMilestonePopups: false,
		notation: "tmt", // Eternal Notations: tmt, eternalDefault, eternalScientific, etc. (credit: MathCookie17)
		font: "orbitron",
	}
}

const GAME_FONTS = {
	classic: { name: "Classic (Inconsolata)", family: '"Inconsolata"', node: "40px", letter: "0", weight: "bold" },
	orbitron: { name: "Sci-Fi (Orbitron)", family: '"Orbitron"', node: "32px", letter: "0.04em", weight: "700" },
	audiowide: { name: "Arcade (Audiowide)", family: '"Audiowide"', node: "30px", letter: "0.02em", weight: "400" },
	exo2: { name: "Clean Tech (Exo 2)", family: '"Exo 2"', node: "36px", letter: "0.02em", weight: "700" },
	rajdhani: { name: "HUD (Rajdhani)", family: '"Rajdhani"', node: "40px", letter: "0.06em", weight: "700" },
	sharetech: { name: "Terminal Mono", family: '"Share Tech Mono"', node: "34px", letter: "0", weight: "400" },
	vt323: { name: "CRT (VT323)", family: '"VT323"', node: "42px", letter: "0.02em", weight: "400" },
	pressstart: { name: "Pixel (Press Start)", family: '"Press Start 2P"', node: "16px", letter: "0", weight: "400" },
	rubik: { name: "Modern (Rubik)", family: '"Rubik"', node: "34px", letter: "0", weight: "700" },
	cinzel: { name: "Fantasy (Cinzel)", family: '"Cinzel"', node: "28px", letter: "0.08em", weight: "700" },
	specialelite: { name: "Typewriter", family: '"Special Elite"', node: "28px", letter: "0.02em", weight: "400" },
	unifraktur: { name: "Blackletter", family: '"UnifrakturMaguntia"', node: "30px", letter: "0", weight: "400" },
}

function getFontOptions() {
	return Object.keys(GAME_FONTS).map(function(id) { return { id: id, name: GAME_FONTS[id].name } })
}

function applyGameFont(id) {
	if (!id || !GAME_FONTS[id]) id = (options && options.font) || "orbitron"
	if (!GAME_FONTS[id]) id = "classic"
	if (options) options.font = id
	let f = GAME_FONTS[id]
	let stack = f.family + ', "DozenalFallback", "Noto Sans Symbols", "Noto Sans Symbols 2", "Segoe UI Symbol", "Lucida Console", monospace'
	let root = document.documentElement
	if (!root || !root.style) return
	root.style.setProperty("--game-font", stack)
	root.style.setProperty("--game-node-font", f.node)
	root.style.setProperty("--game-letter-spacing", f.letter)
	root.style.setProperty("--game-font-weight", f.weight)
	if (typeof needCanvasUpdate !== "undefined") needCanvasUpdate = true
}

function setFontFromDropdown(id) {
	applyGameFont(id)
	if (typeof save === "function") save()
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}

let formatOption = (opt) => opt ? 'ON' : 'OFF'
