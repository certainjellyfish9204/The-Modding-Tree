// ============================================================================
//  THE CLASSIC+ TREE - Full Showcase Starter
//  How to read this file: Each addLayer("id", { ... }) defines a layer.
//  Copy one, change the id, tweak numbers/colors, and you have a new layer!
//  Docs: /docs folder -> upgrades.md, milestones.md, buyables.md, challenges.md
// ============================================================================

// ---------------- ROW 0: PRESTIGE (P) - Your first prestige ----------------
// This is the backbone. Teaches: normal prestige, upgrades, milestones, effect()
addLayer("p", {
    name: "prestige", // Optional, used in a few places
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        if (hasUpgrade('b', 11)) mult = mult.times(upgradeEffect('b', 11))
        if (hasUpgrade('b', 13)) mult = mult.times(2)
        if (hasMilestone('g', 0)) mult = mult.times(2)
        if (hasAchievement('a', 12)) mult = mult.times(1.5)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        if (hasUpgrade('t', 11)) exp = exp.times(1.05)
        return exp
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    // Effect: P points boost point gain
    effect() {
        let eff = player.p.points.add(1).pow(0.5)
        if (hasUpgrade('p', 23)) eff = eff.pow(1.5)
        if (hasUpgrade('g', 12)) eff = eff.times(upgradeEffect('g', 12))
        // softcap after 1e6 effect
        if (eff.gte(1000)) eff = eff.div(1000).pow(0.5).times(1000)
        return eff
    },
    effectDescription() {
        return "which are boosting points by "+format(tmp.p.effect)+"x"
    },
    upgrades: {
        11: {
            title: "The Start",
            description: "Double point gain.",
            cost: new Decimal(1),
        },
        12: {
            description: "Prestige points boost point gain.",
            cost: new Decimal(2),
            effect() {
                let eff = player.p.points.add(1).pow(0.4)
                return eff
            },
            effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 11) },
        },
        13: {
            description: "Points boost prestige gain.",
            cost: new Decimal(5),
            effect() {
                let eff = player.points.add(1).log10().add(1).pow(0.8)
                return eff
            },
            effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 12) },
        },
        14: {
            title: "Synergy",
            description: "Generators boost prestige gain.",
            cost: new Decimal(10),
            effect() {
                let eff = player.g.points.add(1).pow(0.3)
                return eff
            },
            effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 13) && player.g.unlocked },
        },
        21: {
            description: "Unlock a new row-1 layer: Boosters.",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade('p', 13) },
        },
        22: {
            description: "Unlock Generators. Keep P upgrades on reset.",
            cost: new Decimal(30),
            unlocked() { return hasUpgrade('p', 21) },
            onPurchase() {
                // This is for flavor, actual keep is in doReset below
            }
        },
        23: {
            description: "P effect is ^1.5 stronger.",
            cost: new Decimal(100),
            unlocked() { return hasMilestone('b', 1) || hasMilestone('g',1) },
        },
        24: {
            description: "Gain 100% of prestige gain per second.",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade('p', 23) },
        },
    },
    milestones: {
        0: {
            requirementDescription: "5 prestige points",
            effectDescription: "Keep P upgrades on row-1 resets. Autobuy P upgrades.",
            done() { return player.p.best.gte(5) },
            toggles: [["p", "auto"]],
        },
        1: {
            requirementDescription: "20 prestige points",
            effectDescription: "Unlock 2 more P upgrades. Points gain x2.",
            done() { return player.p.best.gte(20) },
            unlocked() { return hasMilestone('p', 0) },
        },
        2: {
            requirementDescription: "50 prestige points",
            effectDescription: "Gain x1.5 more prestige. Unlock Boosters/Gens milestones.",
            done() { return player.p.best.gte(50) },
            unlocked() { return hasMilestone('p', 1) },
        },
    },
    // Keep upgrades when resetting for B or G (row 1)
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('p', 0)) keep.push("upgrades")
            if (hasMilestone('p', 1) && player.p.best.gte(20)) keep.push("milestones")
            layerDataReset(this.layer, keep)
        }
    },
    passiveGeneration() {
        if (hasUpgrade('p', 24)) return 1
        if (hasMilestone('t', 0)) return 0.1
        return 0
    },
    autoUpgrade() { return hasMilestone('p', 0) && player.p.auto },
    // Custom tab to show upgrades + milestones together
    tabFormat: ["main-display", "prestige-button", "resource-display", "blank", ["display-text", function() {return hasMilestone('p',0)?"Milestone 0 gives autobuyer! Toggle with the milestone.":"Get 5 prestige for autobuyer!"} ], "blank", "milestones", "blank", "upgrades"],
})

// ---------------- ROW 1 LEFT: BOOSTERS (B) - Static prestige ----------------
// Teaches: static type, branches, buyables? (here upgrades), milestone with toggles
addLayer("b", {
    name: "boosters",
    symbol: "B",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        auto: false,
    }},
    color: "#FF8800",
    requires: new Decimal(100), // need 100 prestige points
    resource: "boosters",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "static",
    exponent: 1.2, // cost scaling
    base: 10,
    row: 1,
    branches: ["p"],
    layerShown() { return hasUpgrade('p', 21) || player.b.unlocked },
    effect() {
        // Each booster gives x2, with softcap
        let eff = Decimal.pow(2.5, player.b.points)
        if (hasUpgrade('b', 12)) eff = eff.times(upgradeEffect('b', 12))
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.3).times(1e6)
        return eff
    },
    effectDescription() {
        return "which are boosting point gain by "+format(tmp.b.effect)+"x"
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('b', 14)) mult = mult.div(1.5) // cheaper
        return mult
    },
    canBuyMax() { return hasMilestone('b', 2) },
    autoPrestige() { return hasMilestone('b', 3) && player.b.auto },
    resetsNothing() { return false },
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            description: "Boosters boost prestige gain.",
            cost: new Decimal(1),
            effect() { let eff = Decimal.pow(1.5, player.b.points); return eff },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Boosters boost their own effect.",
            cost: new Decimal(2),
            effect() { return player.b.points.add(1).pow(0.5) },
            effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('b', 11) },
        },
        13: {
            description: "Double prestige gain and point effect of B.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('b', 12) },
        },
        14: {
            description: "Booster cost scaling is 30% cheaper.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('b', 13) },
        },
        21: {
            description: "Unlock a Booster Buyable for huge points boost.",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade('b', 14) },
        },
    },
    buyables: {
        11: {
            title: "Booster Engine",
            cost(x) { return new Decimal(10).pow(x.pow(1.25)) },
            effect(x) {
                let eff = Decimal.pow(3, x)
                if (hasUpgrade('g', 13)) eff = eff.pow(1.2)
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: "+format(data.cost)+" boosters\nAmount: "+formatWhole(player.b.buyables[this.id])+"\nEffect: "+format(data.effect)+"x to points"
            },
            unlocked() { return hasUpgrade('b', 21) },
            canAfford() { return player.b.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                let cost = tmp[this.layer].buyables[this.id].cost
                player.b.points = player.b.points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {},
            style: {'height':'120px'},
        },
    },
    milestones: {
        0: { requirementDescription: "1 booster", effectDescription: "Keep P upgrades, gain 2x points", done() {return player.b.best.gte(1)} },
        1: { requirementDescription: "3 boosters", effectDescription: "Unlock another P upgrade. Autobuy B upgrades.", done() {return player.b.best.gte(3)}, toggles: [["b","auto"]], unlocked() {return hasMilestone('b',0)} },
        2: { requirementDescription: "6 boosters", effectDescription: "You can buy max boosters", done() {return player.b.best.gte(6)}, unlocked() {return hasMilestone('b',1)} },
        3: { requirementDescription: "10 boosters", effectDescription: "Auto-prestige for boosters", done() {return player.b.best.gte(10)}, unlocked() {return hasMilestone('b',2)} },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('b', 0)) keep.push("milestones")
            if (hasMilestone('b', 1)) keep.push("upgrades")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: ["main-display", "prestige-button", "resource-display", "blank", "milestones", "blank", "upgrades", "blank", "buyables"],
})

// ---------------- ROW 1 RIGHT: GENERATORS (G) - Normal with buyables --------
// Teaches: buyables, clickables, bars, baseAmount functions
addLayer("g", {
    name: "generators",
    symbol: "G",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        auto: false,
    }},
    color: "#0080FF",
    requires: new Decimal(20),
    resource: "generators",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "normal",
    exponent: 0.4,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('b', 13)) mult = mult.times(1.5)
        return mult
    },
    gainExp() { return new Decimal(1) },
    row: 1,
    branches: ["p"],
    layerShown() { return hasUpgrade('p', 22) || player.g.unlocked },
    effect() {
        let eff = Decimal.pow(2, player.g.points).times(buyableEffect('g', 11))
        if (hasUpgrade('g', 14)) eff = eff.pow(1.1)
        return eff
    },
    effectDescription() {
        return "which are boosting points by "+format(tmp.g.effect)+"x"
    },
    bars: {
        power: {
            direction: RIGHT,
            width: 300,
            height: 20,
            progress() { return player.g.points.div(20).toNumber() },
            display() { return format(player.g.points)+"/20 generators to next milestone" },
            fillStyle: {'background-color': "#0080FF"},
            baseStyle: {'background-color': "#222222"},
            textStyle: {'color': "white"},
        },
        overcharge: {
            direction: UP,
            width: 40,
            height: 200,
            progress() { return getBuyableAmount('g', 11).div(10).toNumber() },
            display() { return formatWhole(getBuyableAmount('g',11))+"/10" },
            fillStyle: {'background-color': "#00FFFF"},
            unlocked() { return hasUpgrade('g', 12) },
        },
    },
    upgrades: {
        11: {
            description: "Generators boost prestige gain.",
            cost: new Decimal(2),
            effect() { return player.g.points.add(1).pow(0.6) },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Generators boost P's effect.",
            cost: new Decimal(5),
            effect() { return player.g.points.add(1).pow(0.25) },
            effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('g', 11) },
        },
        13: {
            description: "Booster Engine buyable is 20% stronger.",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade('g', 12) },
        },
        14: {
            description: "Generator effect ^1.1",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('g', 13) },
        },
    },
    buyables: {
        11: {
            title: "Generator Mk I",
            cost(x) { 
                // scaling gets steeper after 10
                if (x.gte(10)) x = x.pow(1.5).div(10).pow(0.5)
                return new Decimal(5).pow(x).times(10) 
            },
            effect(x) {
                let eff = Decimal.pow(1.8, x)
                if (hasUpgrade('g', 13) && player.b.buyables[11]) eff = eff.times(tmp.b.buyables[11].effect)
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: "+format(data.cost)+" prestige points\nAmount: "+formatWhole(player.g.buyables[this.id])+"\nEffect: "+format(data.effect)+"x to G effect"
            },
            unlocked() { return true },
            canAfford() { return player.p.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                let cost = tmp[this.layer].buyables[this.id].cost
                player.p.points = player.p.points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {'height':'120px'},
            purchaseLimit: new Decimal(25),
        },
        12: {
            title: "Generator Mk II",
            cost(x) { return new Decimal(1000).pow(x).times(1e6) },
            effect(x) { return Decimal.pow(10, x) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: "+format(data.cost)+" points\nAmount: "+formatWhole(player.g.buyables[this.id])+"\nEffect: "+format(data.effect)+"x to points"
            },
            unlocked() { return hasMilestone('g', 2) },
            canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() {
                let cost = tmp[this.layer].buyables[this.id].cost
                player.points = player.points.sub(cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {'height':'120px'},
        },
    },
    clickables: {
        11: {
            title: "Overclock!",
            display() { return "Click to gain 10% of G gain instantly!<br><br>Cooldown: "+format(player.g.clickables[11] || 0)+"s" },
            canClick() { return (player.g.clickables[11]||0) <= 0 },
            onClick() {
                let gain = tmp.g.resetGain.times(0.1).max(1)
                player.g.points = player.g.points.add(gain)
                player.g.clickables[11] = 5 // 5 sec cooldown
            },
            style: {'height':'100px', 'background-color':'#004488'},
            unlocked() { return hasMilestone('g', 1) },
        },
    },
    milestones: {
        0: { requirementDescription: "2 generators", effectDescription: "Prestige gain x2, keep P upgrades", done() {return player.g.best.gte(2)} },
        1: { requirementDescription: "5 generators", effectDescription: "Unlock clickables + keep G buyables on reset", done() {return player.g.best.gte(5)}, unlocked() {return hasMilestone('g',0)} },
        2: { requirementDescription: "10 generators", effectDescription: "Unlock Mk II buyable & bars", done() {return player.g.best.gte(10)}, unlocked() {return hasMilestone('g',1)} },
        3: { requirementDescription: "20 generators", effectDescription: "Gain 50% of G gain per second passively", done() {return player.g.best.gte(20)}, unlocked() {return hasMilestone('g',2)} },
    },
    update(diff) {
        // cooldown for clickable
        if (player.g.clickables[11] > 0) {
            player.g.clickables[11] = Math.max(0, player.g.clickables[11] - diff)
        }
    },
    passiveGeneration() { return hasMilestone('g', 3) ? 0.5 : 0 },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('g', 0)) keep.push("milestones")
            if (hasMilestone('g', 1)) keep.push("buyables")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: {
        "Generators": {
            content: ["main-display", "prestige-button", "resource-display", "blank", ["bar","power"], "blank", "milestones", "blank", "upgrades", "blank", "buyables", "blank", "clickables"],
        },
        "Stats": {
            content: [["display-text", function() {return "You have "+formatWhole(player.g.points)+" generators, boosting points by "+format(tmp.g.effect)+"x" }], "blank", ["bar","overcharge"], "blank", ["display-text", function() {return "Mk I amount: "+formatWhole(getBuyableAmount('g',11))+" (effect "+format(buyableEffect('g',11))+"x)" }]],
            unlocked() {return hasMilestone('g',2)},
        },
    },
})

// ---------------- ROW 2: TIME (T) - Combines B + G --------------------------------
// Teaches: challenges, bars, infoboxes, higher row requirements, prestigeButtonText override
addLayer("t", {
    name: "time shards",
    symbol: "T",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#AA00FF",
    requires: new Decimal(2000), // 2000 prestige points
    resource: "time shards",
    baseResource: "prestige points",
    baseAmount() {return player.p.points},
    type: "normal",
    exponent: 0.3,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('t', 12)) mult = mult.times(2)
        if (player.b.points.gte(5)) mult = mult.times(player.b.points)
        return mult
    },
    gainExp() { return new Decimal(1) },
    row: 2,
    branches: [["b","#FF8800"], ["g","#0080FF"]],
    layerShown() { return hasMilestone('b', 2) && hasMilestone('g', 2) || player.t.unlocked },
    effect() {
        let eff = player.t.points.add(1).pow(0.7)
        if (hasChallenge('t', 11)) eff = eff.times(challengeEffect('t', 11))
        if (hasChallenge('t', 12)) eff = eff.times(challengeEffect('t', 12))
        return eff
    },
    effectDescription() { return "which are boosting points & prestige by "+format(tmp.t.effect)+"x" },
    infoboxes: {
        lore: {
            title: "The Time Rift",
            body: "At row 2, the tree converges. Time Shards need BOTH boosters and generators. Enter challenges to multiply your power, but they make the game harder!<br><br>Tip: Do T challenges in order. Reward from 11 helps with 12.",
            unlocked() { return true },
        },
    },
    bars: {
        timeBar: {
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() { return player.t.points.div(player.t.points.add(10)).toNumber() },
            display() { return format(player.t.points)+" time shards" },
            fillStyle: {'background-color': "#AA00FF"},
            unlocked() { return true },
        },
    },
    upgrades: {
        11: {
            description: "Time Shards boost G effect.",
            cost: new Decimal(1),
            effect() { return player.t.points.add(1).pow(0.5) },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Double T gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('t', 11) },
        },
        13: {
            description: "Unlock Hyper layer.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('t', 12) },
        },
    },
    challenges: {
        11: {
            name: "Slowdown",
            challengeDescription: "Point gain is square-rooted (much slower).",
            goalDescription: "Reach 1e6 points",
            canComplete() { return player.points.gte(1e6) },
            rewardDescription: "Time effect is stronger (x^1.2)",
            rewardEffect() { let eff = player.t.points.add(1).pow(0.2); return eff },
            rewardDisplay() { return format(this.rewardEffect())+"x" },
            unlocked() { return player.t.unlocked },
        },
        12: {
            name: "Taxation",
            challengeDescription: "You can't buy P upgrades 11-14. Point gain ^0.7",
            goalDescription: "Reach 5e7 points",
            canComplete() { return player.points.gte(5e7) },
            rewardDescription: "Gain 2x more prestige points",
            rewardEffect() { return new Decimal(2) },
            rewardDisplay() { return format(this.rewardEffect())+"x" },
            unlocked() { return hasChallenge('t', 11) },
            countsAs: [11], // also applies Slowdown
        },
        21: {
            name: "Hyper Tax",
            challengeDescription: "Boosters and Generators do nothing. G effect is disabled.",
            goalDescription: "Reach 1e10 points",
            canComplete() { return player.points.gte(1e10) },
            rewardDescription: "Keep B and G milestones on T reset",
            unlocked() { return hasChallenge('t', 12) },
        },
    },
    milestones: {
        0: { requirementDescription: "1 time shard", effectDescription: "Keep B upgrades, gain 10% prestige passively", done() {return player.t.best.gte(1)} },
        1: { requirementDescription: "3 time shards", effectDescription: "Keep G upgrades+buyables, T gain x2", done() {return player.t.best.gte(3)}, unlocked() {return hasMilestone('t',0)} },
        2: { requirementDescription: "8 time shards", effectDescription: "Auto-buy T upgrades, keep T upgrades on next layer", done() {return player.t.best.gte(8)}, unlocked() {return hasMilestone('t',1)} },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = ["milestones"]
            if (hasMilestone('t', 1) || hasChallenge('t', 21)) keep.push("upgrades")
            if (hasMilestone('t', 2)) keep.push("challenges")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: ["main-display", "prestige-button", "resource-display", "blank", ["infobox","lore"], "blank", ["bar","timeBar"], "blank", "milestones", "blank", "upgrades", "blank", "challenges"],
})

// ---------------- ROW 3: HYPER (H) - Endgame static layer ----------------------
// Teaches: static with high base, softcap, endgame push, custom prestigeButtonText
addLayer("h", {
    name: "hyper",
    symbol: "H",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#DD2222",
    requires: new Decimal(20), // 20 time shards
    resource: "hyper points",
    baseResource: "time shards",
    baseAmount() {return player.t.points},
    type: "static",
    base: 2.5,
    exponent: 1.4,
    row: 3,
    branches: ["t"],
    layerShown() { return hasUpgrade('t', 13) || player.h.unlocked },
    effect() {
        let eff = Decimal.pow(100, player.h.points)
        if (hasUpgrade('h', 12)) eff = eff.pow(1.5)
        // softcap to prevent explosion
        if (eff.gte("1e40")) eff = eff.div("1e40").pow(0.5).times("1e40")
        return eff
    },
    effectDescription() { return "which are boosting ALL previous gains by "+format(tmp.h.effect)+"x" },
    prestigeButtonText() {
        // Use tmp if it's already a Decimal, otherwise compute directly (tmp is {} during first updateTemp)
        let gain = (typeof tmp !== 'undefined' && tmp.h && tmp.h.resetGain instanceof Decimal) ? tmp.h.resetGain : getResetGain(this.layer)
        let at = (typeof tmp !== 'undefined' && tmp.h && tmp.h.nextAt instanceof Decimal) ? tmp.h.nextAt : getNextAt(this.layer)
        if (gain.gte(1)) return "Reset for <b>"+formatWhole(gain)+"</b> hyper points<br>Next at "+formatWhole(at)+" time shards"
        return "Need "+formatWhole(at)+" time shards ("+formatWhole(player.t.points)+"/"+formatWhole(at)+")"
    },
    upgrades: {
        11: {
            description: "Hyper points boost T gain.",
            cost: new Decimal(1),
            effect() { return player.h.points.add(1).pow(0.8) },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Hyper effect ^1.5",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('h', 11) },
        },
        13: {
            description: "Gain 5x more points, unlock second win condition.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('h', 12) },
        },
    },
    milestones: {
        0: { requirementDescription: "1 hyper point", effectDescription: "Keep T milestones and auto-buy T", done() {return player.h.best.gte(1)} },
        1: { requirementDescription: "3 hyper points", effectDescription: "Boosters and Generators are 3x cheaper", done() {return player.h.best.gte(3)}, unlocked() {return hasMilestone('h',0)} },
    },
    hotkeys: [
        {key: "h", description: "H: Reset for hyper points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    doReset(resettingLayer) {
        // never resets h itself
    },
    tabFormat: ["main-display", ["display-text", function() {return tmp.h.prestigeButtonText}], "blank", "resource-display", "blank", "milestones", "blank", "upgrades"],
})

// ---------------- SIDE: ACHIEVEMENTS (A) -------------------------------------
addLayer("a", {
    startData() { return { unlocked: true }},
    color: "gold",
    row: "side",
    layerShown() { return true },
    tooltip() { return "Achievements" },
    achievements: {
        11: {
            name: "Prestigious",
            done() { return player.p.best.gte(1) },
            tooltip: "Get 1 prestige point. Reward: Points x1.5",
            onComplete() { console.log("First prestige!") },
        },
        12: {
            name: "Boosted",
            done() { return player.b.best.gte(1) },
            tooltip: "Get 1 booster. Reward: Points & prestige x1.5",
            unlocked() { return player.b.unlocked },
        },
        13: {
            name: "Generated",
            done() { return player.g.best.gte(1) },
            tooltip: "Get 1 generator. Reward: Points x1.2",
            unlocked() { return player.g.unlocked },
        },
        14: {
            name: "Timely",
            done() { return player.t.best.gte(1) },
            tooltip() { return "Get 1 time shard. Reward: Points x"+format(this.effect()) },
            effect() { return player.t.best.add(1).pow(0.15) },
            unlocked() { return player.t.unlocked },
        },
        21: {
            name: "Challenge Accepted",
            done() { return hasChallenge('t', 11) },
            tooltip: "Complete Time Challenge 11",
            unlocked() { return player.t.unlocked },
        },
        22: {
            name: "Hyper!",
            done() { return player.h.best.gte(1) },
            tooltip: "Get 1 hyper point. Reward: Keep achievements? You already do!",
            unlocked() { return player.h.unlocked },
        },
        23: {
            name: "Speedrun",
            done() { return player.points.gte(1e9) && player.h.best.lte(0) },
            tooltip: "Reach 1e9 points without any hyper points. Reward: Bragging rights.",
            unlocked() { return player.t.unlocked },
        },
        24: {
            name: "Overkill",
            done() { return player.points.gte("1e20") },
            tooltip: "Reach 1e20 points",
            unlocked() { return player.h.unlocked },
        },
    },
    tabFormat: ["main-display", "achievements"],
    achievementPopups: true,
})

