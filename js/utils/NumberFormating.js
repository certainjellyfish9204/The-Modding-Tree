
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

// ============================================================================
// Eternal Notations support — credit: MathCookie17
// Library: https://github.com/MathCookie17/Eternal-Notations (MIT)
// Built on break_eternity.js, 144 presets + 65 notations, up to 10^^(10^308)
// We keep TMT's original format as fallback ("tmt" notation) and add Eternal.
// ============================================================================
let eternalNotationsEnabled = false
let currentEternalNotation = null
let currentNotationId = "tmt" // tmt = original, others are Eternal preset names

// Map our option ids to EternalNotations presets
function getEternalPreset(id) {
    if (typeof EternalNotations === "undefined") return null
    // Handle plain text presets vs HTML presets — we use plain for format()
    const presets = EternalNotations.Presets
    switch(id) {
        case "eternalDefault": return presets.Default
        case "eternalScientific": return presets.Scientific
        case "eternalEngineering": return presets.Engineering
        case "eternalStandard": return presets.Standard
        case "eternalInfinity": return presets.Infinity
        case "eternalEternity": return presets.Eternity
        case "eternalHyperscientific": return presets.Hyperscientific
        case "eternalEternityScientific": return presets.EternityScientific
        case "eternalTetration": return presets.Tetration
        case "eternalBoundless": return presets.Boundless
        default: return null
    }
}

function setNotation(id) {
    currentNotationId = id
    if (id === "tmt") {
        eternalNotationsEnabled = false
        currentEternalNotation = null
    } else {
        let preset = getEternalPreset(id)
        if (preset) {
            eternalNotationsEnabled = true
            currentEternalNotation = preset
        } else {
            // Fallback if EternalNotations not loaded or preset not found
            eternalNotationsEnabled = false
            currentEternalNotation = null
            console.warn("[Eternal Notations] Preset not found or library not loaded:", id)
        }
    }
    // Save to options if available
    if (typeof options !== "undefined") options.notation = id
    if (typeof player !== "undefined" && player !== null) save()
}

function getCurrentNotationName() {
    const names = {
        "tmt": "TMT (default)",
        "eternalDefault": "Eternal Default",
        "eternalScientific": "Scientific (Eternal)",
        "eternalEngineering": "Engineering (Eternal)",
        "eternalStandard": "Standard (Eternal)",
        "eternalInfinity": "Infinity",
        "eternalEternity": "Eternity",
        "eternalHyperscientific": "Hyperscientific",
        "eternalTetration": "Tetration",
        "eternalBoundless": "Boundless"
    }
    return names[currentNotationId] || currentNotationId
}

// Cycle through notations for options button
const NOTATIONS = ["tmt", "eternalDefault", "eternalScientific", "eternalEngineering", "eternalStandard", "eternalInfinity", "eternalEternity", "eternalHyperscientific", "eternalTetration", "eternalBoundless"]
function cycleNotation() {
    let idx = NOTATIONS.indexOf(currentNotationId)
    let next = NOTATIONS[(idx + 1) % NOTATIONS.length]
    setNotation(next)
    // Also update options.notation for save
    if (typeof options !== "undefined") options.notation = next
}

// Try to restore notation from options after load
function initNotationFromOptions() {
    if (typeof options !== "undefined" && options.notation) {
        setNotation(options.notation)
    } else if (typeof player !== "undefined" && player.notation) {
        setNotation(player.notation)
    } else {
        setNotation("tmt")
    }
}

// Auto-init when EternalNotations loads (defer a bit to ensure options exists)
setTimeout(() => {
    try { initNotationFromOptions() } catch(e) {}
}, 500)

// Original TMT format as fallback
function formatTMT(decimal, precision = 2, small) {
    small = small || (typeof modInfo !== "undefined" && modInfo.allowSmall)
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        if (typeof player !== "undefined" && player) player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + formatTMT(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + formatTMT(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return formatTMT(decimal, precision) + "⁻¹"

}

function format(decimal, precision = 2, small) {
    // If Eternal Notations is enabled and available, use it
    if (eternalNotationsEnabled && currentEternalNotation && typeof EternalNotations !== "undefined") {
        try {
            decimal = new Decimal(decimal)
            if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
                if (typeof player !== "undefined" && player) player.hasNaN = true;
                return "NaN"
            }
            // Eternal Notations handles all numbers, including small and negative, so we can just call it
            // It expects a Decimal, and returns a string
            return currentEternalNotation.format(decimal)
        } catch (e) {
            console.warn("[Eternal Notations] format failed, falling back to TMT:", e)
            return formatTMT(decimal, precision, small)
        }
    }
    return formatTMT(decimal, precision, small)
}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (eternalNotationsEnabled && currentEternalNotation) {
        // For whole numbers, Eternal Notations will handle it, but we want no decimals for small numbers
        // We can just call format with precision 0 for <1e9
        if (decimal.gte(1e9)) return format(decimal, 2)
        if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
        return format(decimal, 0)
    }
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}
