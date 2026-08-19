// ============================================================================
//  THE CLASSIC+ TREE v0.3 - WAY MORE CONTENT
//  10 layers: P (0) - B/G/M (1) - T/W (2) - H/Q (3) - E (4) + A/S side
//  Each layer showcases different TMT features. Copy a layer to make your own!
//  Docs: /docs -> upgrades.md, milestones.md, buyables.md, challenges.md, etc
// ============================================================================

// ---------------- ROW 0: PRESTIGE (P) - Expanded ----------------
addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return { unlocked: true, points: new Decimal(0), best: new Decimal(0), auto: false }},
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
        if (hasUpgrade('p', 32)) mult = mult.times(upgradeEffect('p', 32))
        if (hasUpgrade('b', 11)) mult = mult.times(upgradeEffect('b', 11))
        if (hasUpgrade('b', 13)) mult = mult.times(2)
        if (hasUpgrade('m', 11)) mult = mult.times(upgradeEffect('m', 11))
        if (hasMilestone('g', 0)) mult = mult.times(2)
        if (hasMilestone('p', 3)) mult = mult.times(2.5)
        if (hasAchievement('a', 12)) mult = mult.times(1.5)
        if (hasAchievement('a', 33)) mult = mult.times(2)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        if (hasUpgrade('t', 11)) exp = exp.times(1.05)
        if (hasUpgrade('q', 12)) exp = exp.times(1.08)
        if (hasMilestone('e', 0)) exp = exp.times(1.1)
        return exp
    },
    row: 0,
    hotkeys: [{key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}],
    layerShown(){return true},
    effect() {
        let eff = player.p.points.add(1).pow(0.5)
        if (hasUpgrade('p', 23)) eff = eff.pow(1.5)
        if (hasUpgrade('p', 31)) eff = eff.pow(1.25)
        if (hasUpgrade('g', 12)) eff = eff.times(upgradeEffect('g', 12))
        if (hasUpgrade('m', 13)) eff = eff.times(upgradeEffect('m', 13))
        if (hasAchievement('a', 24)) eff = eff.times(1.5)
        if (eff.gte(1000)) eff = eff.div(1000).pow(0.5).times(1000)
        if (hasUpgrade('e', 12)) eff = eff.pow(1.1)
        return eff
    },
    effectDescription() { return "which are boosting points by "+format(tmp.p.effect)+"x" },
    bars: {
        prestigeBar: {
            direction: RIGHT, width: 350, height: 22,
            progress() { return player.p.points.div(player.p.best.add(10)).toNumber() },
            display() { return formatWhole(player.p.points)+" / "+formatWhole(player.p.best.add(10))+" best" },
            fillStyle: {'background-color': "#4BDC13"}, baseStyle: {'background-color': "#222"}, textStyle: {'color': "white"},
        }
    },
    upgrades: {
        11: { title: "The Start", description: "Double point gain.", cost: new Decimal(1) },
        12: {
            description: "Prestige points boost point gain.", cost: new Decimal(2),
            effect() { return player.p.points.add(1).pow(0.4) }, effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 11) },
        },
        13: {
            description: "Points boost prestige gain.", cost: new Decimal(5),
            effect() { return player.points.add(1).log10().add(1).pow(0.8) }, effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 12) },
        },
        14: {
            title: "Synergy", description: "Generators boost prestige gain.", cost: new Decimal(10),
            effect() { return player.g.points.add(1).pow(0.3) }, effectDisplay() { return format(this.effect())+"x" },
            unlocked() { return hasUpgrade('p', 13) && player.g.unlocked },
        },
        21: { description: "Unlock Boosters.", cost: new Decimal(20), unlocked() { return hasUpgrade('p', 13) } },
        22: { description: "Unlock Generators. Keep P upgrades on reset.", cost: new Decimal(30), unlocked() { return hasUpgrade('p', 21) } },
        23: { description: "P effect is ^1.5 stronger.", cost: new Decimal(100), unlocked() { return hasMilestone('b', 1) || hasMilestone('g',1) } },
        24: { description: "Gain 100% of prestige gain per second.", cost: new Decimal(250), unlocked() { return hasUpgrade('p', 23) } },
        31: { description: "P effect ^1.25 and prestige gain +25%.", cost: new Decimal(500), effect() { return new Decimal(1.25) }, unlocked() { return hasUpgrade('p', 24) && player.m.unlocked } },
        32: { description: "Mana boosts prestige gain.", cost: new Decimal(1000), effect() { return player.m.points.add(1).pow(0.35) }, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('p',31) && hasUpgrade('m',11)} },
        33: { description: "Unlock Mana (if not yet). Prestige gain x3.", cost: new Decimal(2500), unlocked(){ return hasUpgrade('p',32)} },
        34: { description: "Keep B/G/M upgrades on T/W resets.", cost: new Decimal(5000), unlocked(){ return hasUpgrade('p',33) && hasMilestone('t',1)} },
        // Row 2 unlocks
        41: { description: "Time Shards boost point gain x2.", cost: new Decimal(25000), effect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('p',34) && player.t.unlocked} },
        42: { description: "Warp Shards boost prestige gain.", cost: new Decimal(1e6), effect(){ return player.w.points.add(1).pow(0.4)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('p',41) && player.w.unlocked} },
    },
    buyables: {
        11: {
            title: "Prestige Condenser",
            cost(x){ return new Decimal(100).pow(x).times(100) },
            effect(x){ let eff = Decimal.pow(1.5, x); if(hasUpgrade('p',34)) eff=eff.times(1.5); return eff; },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" prestige<br>Amount: "+formatWhole(player.p.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x prestige gain"
            },
            unlocked(){ return hasUpgrade('p',34) },
            canAfford(){ return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.p.points=player.p.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Point Amplifier",
            cost(x){ return new Decimal(10).pow(x).times(1e4) },
            effect(x){ return Decimal.pow(2, x) },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" points<br>Amount: "+formatWhole(player.p.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x points"
            },
            unlocked(){ return hasMilestone('p',4) },
            canAfford(){ return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.points=player.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "No Boosters",
            challengeDescription: "B effect is disabled. B upgrades do nothing.",
            goalDescription: "Reach 1e7 points",
            canComplete(){ return player.points.gte(1e7) },
            rewardDescription: "P gain x2, B effect +25%",
            rewardEffect(){ return new Decimal(2) }, rewardDisplay(){ return format(this.rewardEffect())+"x"},
            unlocked(){ return hasUpgrade('p',31) },
        }
    },
    milestones: {
        0: { requirementDescription: "5 prestige", effectDescription: "Keep P upgrades on row-1 resets. Autobuy P.", done() { return player.p.best.gte(5) }, toggles: [["p", "auto"]] },
        1: { requirementDescription: "20 prestige", effectDescription: "Unlock 2 more P upgrades. Points x2.", done() { return player.p.best.gte(20) }, unlocked() { return hasMilestone('p', 0) } },
        2: { requirementDescription: "50 prestige", effectDescription: "Gain x1.5 more prestige.", done() { return player.p.best.gte(50) }, unlocked() { return hasMilestone('p', 1) } },
        3: { requirementDescription: "500 prestige", effectDescription: "Prestige gain x2.5, keep P buyables", done() { return player.p.best.gte(500) }, unlocked() { return hasMilestone('p', 2)} },
        4: { requirementDescription: "5,000 prestige", effectDescription: "Points x2, unlock P buyables & challenge", done() { return player.p.best.gte(5000) }, unlocked() { return hasMilestone('p',3)} },
        5: { requirementDescription: "1e6 prestige", effectDescription: "Gain 50% prestige passively, keep milestones on E", done() { return player.p.best.gte(1e6) }, unlocked() { return hasMilestone('p',4)} },
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('p', 0)) keep.push("upgrades")
            if (hasMilestone('p', 1) && player.p.best.gte(20)) keep.push("milestones")
            if (hasMilestone('p', 3)) keep.push("buyables")
            if (hasMilestone('p', 4) && hasMilestone('t',2)) keep.push("challenges")
            layerDataReset(this.layer, keep)
        }
    },
    passiveGeneration() { if (hasUpgrade('p', 24)) return 1; if (hasMilestone('t', 0)) return 0.1; if (hasMilestone('p',5)) return 0.5; return 0 },
    autoUpgrade() { return hasMilestone('p', 0) && player.p.auto },
    tabFormat: {
        "Main": { content: ["main-display","prestige-button","resource-display","blank",["bar","prestigeBar"],"blank",["display-text", function() {return hasMilestone('p',0)?"Milestone 0 gives autobuyer!":"Get 5 prestige for autobuyer!"} ],"blank","milestones","blank","upgrades"]},
        "Buyables": { content: ["main-display","blank","buyables","blank",["display-text", function(){return "Condensers boost prestige. Amplifiers boost points."}]], unlocked(){return hasMilestone('p',4)}},
        "Challenge": { content: ["main-display","blank","challenges"], unlocked(){return hasMilestone('p',4)}},
    }
})

// ---------------- ROW 1 LEFT: BOOSTERS (B) - Expanded ----------------
addLayer("b", {
    name: "boosters", symbol: "B", position: 0,
    startData() { return { unlocked: false, points: new Decimal(0), best: new Decimal(0), auto: false }},
    color: "#FF8800",
    requires: new Decimal(100), resource: "boosters", baseResource: "prestige points", baseAmount() {return player.p.points},
    type: "static", exponent: 1.2, base: 10, row: 1, branches: ["p"],
    layerShown() { return hasUpgrade('p', 21) || player.b.unlocked },
    effect() {
        let eff = Decimal.pow(2.5, player.b.points)
        if (hasUpgrade('b', 12)) eff = eff.times(upgradeEffect('b', 12))
        if (hasUpgrade('b', 23)) eff = eff.pow(1.2)
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.3).times(1e6)
        if (hasUpgrade('e', 11)) eff = eff.pow(1.1)
        return eff
    },
    effectDescription() { return "which are boosting point gain by "+format(tmp.b.effect)+"x" },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('b', 14)) mult = mult.div(1.5)
        if (hasMilestone('b', 5)) mult = mult.div(2)
        if (hasUpgrade('q', 13)) mult = mult.div(1.3)
        return mult
    },
    bars: {
        boosterBar: { direction: RIGHT, width: 320, height: 20, progress() { return player.b.points.div(15).toNumber() }, display(){ return formatWhole(player.b.points)+"/15 for next milestone"}, fillStyle:{'background-color':"#FF8800"}, baseStyle:{'background-color':"#333"}, },
    },
    canBuyMax() { return hasMilestone('b', 2) },
    autoPrestige() { return hasMilestone('b', 3) && player.b.auto },
    hotkeys: [{key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}}],
    upgrades: {
        11: { description: "Boosters boost prestige gain.", cost: new Decimal(1), effect() { return Decimal.pow(1.5, player.b.points) }, effectDisplay() { return format(this.effect())+"x" } },
        12: { description: "Boosters boost their own effect.", cost: new Decimal(2), effect() { return player.b.points.add(1).pow(0.5) }, effectDisplay() { return format(this.effect())+"x" }, unlocked() { return hasUpgrade('b', 11) } },
        13: { description: "Double prestige gain and point effect of B.", cost: new Decimal(3), unlocked() { return hasUpgrade('b', 12) } },
        14: { description: "Booster cost scaling is 30% cheaper.", cost: new Decimal(5), unlocked() { return hasUpgrade('b', 13) } },
        21: { description: "Unlock Booster Engine buyable.", cost: new Decimal(8), unlocked() { return hasUpgrade('b', 14) } },
        22: { description: "Booster effect ^1.2 and prestige x1.5.", cost: new Decimal(12), unlocked() { return hasUpgrade('b', 21) }, effect(){ return new Decimal(1.2)} },
        23: { description: "Boosters boost Mana gain.", cost: new Decimal(20), effect(){ return player.b.points.add(1).pow(0.4)}, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('b',22) && player.m.unlocked }},
        31: { description: "Unlock B challenge: Overclocked.", cost: new Decimal(50), unlocked(){ return hasUpgrade('b',23)} },
        32: { description: "Gain 1 free Booster Engine level.", cost: new Decimal(100), unlocked(){ return hasUpgrade('b',31)}, onPurchase(){ setBuyableAmount('b',11, getBuyableAmount('b',11).add(1)) }},
        33: { description: "B milestones also give +1 free Generator.", cost: new Decimal(250), unlocked(){ return hasUpgrade('b',32)} },
    },
    buyables: {
        11: {
            title: "Booster Engine", cost(x) { return new Decimal(10).pow(x.pow(1.25)) }, effect(x) { let eff = Decimal.pow(3, x); if (hasUpgrade('g', 13)) eff = eff.pow(1.2); if(hasUpgrade('b',22)) eff=eff.times(1.5); return eff; },
            display() { let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" boosters<br>Amount: "+formatWhole(player.b.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points" },
            unlocked() { return hasUpgrade('b', 21) }, canAfford() { return player.b.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() { let c=tmp[this.layer].buyables[this.id].cost; player.b.points=player.b.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style: {'height':'120px'},
        },
        12: {
            title: "Booster Farm", cost(x){ return new Decimal(100).pow(x).times(10) }, effect(x){ return Decimal.pow(2, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" prestige points<br>Amount: "+formatWhole(player.b.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to B effect"},
            unlocked(){ return hasMilestone('b',4)}, canAfford(){ return player.p.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.p.points=player.p.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        13: {
            title: "Auto-Booster", cost(x){ return new Decimal(1000).pow(x).times(1e4) }, effect(x){ return x.gte(1) ? new Decimal(1.1).pow(x) : new Decimal(1) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" points<br>Amount: "+formatWhole(player.b.buyables[this.id])+"<br>Effect: passive B gain "+format(d.effect.times(100).sub(100))+"%"},
            unlocked(){ return hasMilestone('b',5)}, canAfford(){ return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.points=player.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "Overclocked", challengeDescription: "You can only have 1 booster. Prestige gain is ^0.5.",
            goalDescription: "Reach 1e8 points with 1 booster", canComplete(){ return player.points.gte(1e8) && player.b.points.lte(1) },
            rewardDescription: "B effect x1.5 and keep B upgrades on reset",
            rewardEffect(){ return new Decimal(1.5)}, rewardDisplay(){ return format(this.rewardEffect())+"x"},
            unlocked(){ return hasUpgrade('b',31)},
        }
    },
    milestones: {
        0: { requirementDescription: "1 booster", effectDescription: "Keep P upgrades, gain 2x points", done() {return player.b.best.gte(1)} },
        1: { requirementDescription: "3 boosters", effectDescription: "Unlock another P upgrade. Autobuy B.", done() {return player.b.best.gte(3)}, toggles: [["b","auto"]], unlocked() {return hasMilestone('b',0)} },
        2: { requirementDescription: "6 boosters", effectDescription: "You can buy max boosters", done() {return player.b.best.gte(6)}, unlocked() {return hasMilestone('b',1)} },
        3: { requirementDescription: "10 boosters", effectDescription: "Auto-prestige for boosters", done() {return player.b.best.gte(10)}, unlocked() {return hasMilestone('b',2)} },
        4: { requirementDescription: "20 boosters", effectDescription: "Unlock Booster Farm buyable", done(){ return player.b.best.gte(20)}, unlocked(){return hasMilestone('b',3)} },
        5: { requirementDescription: "35 boosters", effectDescription: "B cost /2, points x3", done(){ return player.b.best.gte(35)}, unlocked(){return hasMilestone('b',4)} },
        6: { requirementDescription: "50 boosters", effectDescription: "Gain 10% boosters passively", done(){ return player.b.best.gte(50)}, unlocked(){return hasMilestone('b',5)} },
    },
    passiveGeneration(){ return hasMilestone('b',6) ? 0.1 : 0 },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('b', 0)) keep.push("milestones")
            if (hasMilestone('b', 1) || hasChallenge('b',11)) keep.push("upgrades")
            if (hasMilestone('b',4)) keep.push("buyables")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: ["main-display","prestige-button","resource-display","blank",["bar","boosterBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","challenges"],
})

// ---------------- ROW 1 MIDDLE: GENERATORS (G) - Expanded ----------------
addLayer("g", {
    name: "generators", symbol: "G", position: 1,
    startData() { return { unlocked: false, points: new Decimal(0), best: new Decimal(0), total: new Decimal(0), auto: false }},
    color: "#0080FF",
    requires: new Decimal(20), resource: "generators", baseResource: "prestige points", baseAmount() {return player.p.points},
    type: "normal", exponent: 0.4, gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('b', 13)) mult = mult.times(1.5)
        if (hasUpgrade('p', 41)) mult = mult.times(2)
        if (hasMilestone('g', 5)) mult = mult.times(2)
        return mult
    }, gainExp() { return new Decimal(1) },
    row: 1, branches: ["p"],
    layerShown() { return hasUpgrade('p', 22) || player.g.unlocked },
    effect() {
        let eff = Decimal.pow(2, player.g.points).times(buyableEffect('g', 11))
        if (hasUpgrade('g', 14)) eff = eff.pow(1.1)
        if (hasUpgrade('g', 23)) eff = eff.times(upgradeEffect('g', 23))
        if (hasUpgrade('w', 12)) eff = eff.times(1.5)
        return eff
    },
    effectDescription() { return "which are boosting points by "+format(tmp.g.effect)+"x" },
    bars: {
        power: { direction: RIGHT, width: 320, height: 20, progress() { return player.g.points.div(30).toNumber() }, display() { return format(player.g.points)+"/30 generators"}, fillStyle: {'background-color': "#0080FF"}, baseStyle: {'background-color': "#222"}, textStyle: {'color': "white"}, },
        overcharge: { direction: UP, width: 40, height: 200, progress() { return getBuyableAmount('g', 11).div(15).toNumber() }, display() { return formatWhole(getBuyableAmount('g',11))+"/15" }, fillStyle: {'background-color': "#00FFFF"}, unlocked() { return hasUpgrade('g', 12) }, },
        gridPower: { direction: RIGHT, width: 300, height: 18, progress(){ return getBuyableAmount('g',13).div(5).toNumber()}, display(){ return "Grid Tech: "+formatWhole(getBuyableAmount('g',13))+"/5"}, fillStyle:{'background-color':"#44ff44"}, unlocked(){ return hasMilestone('g',5)}, },
    },
    grid: {
        rows: 3, cols: 3, maxRows: 3, maxCols: 3,
        getStartData(id){ return 0 },
        getUnlocked(id){ return hasMilestone('g',4) },
        getCanClick(data, id){ return player.g.points.gte(5) && data < 2 },
        getStyle(data, id){ if(data==0) return {'background-color':"#222"}; if(data==1) return {'background-color':"#0080FF"}; return {'background-color':"#00ff00"}; },
        onClick(data, id){
            let cur = player.g.grid[id];
            if(cur < 2){
                if(player.g.points.gte(5)){
                    player.g.points = player.g.points.sub(5);
                    player.g.grid[id] = cur + 1;
                }
            }
        },
        getTitle(data, id){ return "Tile "+id },
        getDisplay(data, id){ return data==0?"Empty":data==1?"Charged":"Overcharged" },
        getTooltip(data, id){ return "Cost: 5 generators. Click to upgrade." },
    },
    upgrades: {
        11: { description: "Generators boost prestige gain.", cost: new Decimal(2), effect() { return player.g.points.add(1).pow(0.6) }, effectDisplay() { return format(this.effect())+"x" } },
        12: { description: "Generators boost P's effect.", cost: new Decimal(5), effect() { return player.g.points.add(1).pow(0.25) }, effectDisplay() { return format(this.effect())+"x" }, unlocked() { return hasUpgrade('g', 11) } },
        13: { description: "Booster Engine buyable is 20% stronger.", cost: new Decimal(8), unlocked() { return hasUpgrade('g', 12) } },
        14: { description: "Generator effect ^1.1", cost: new Decimal(15), unlocked() { return hasUpgrade('g', 13) } },
        21: { description: "Unlock Grid (3x3). Spend G to charge tiles for +10% each.", cost: new Decimal(25), unlocked(){ return hasUpgrade('g',14)} },
        22: { description: "Grid gives +0.1x per Overcharged tile to point gain.", cost: new Decimal(50), effect(){ let c=0; for(let id in player.g.grid) if(player.g.grid[id]==2) c++; return new Decimal(1).add(c*0.1)}, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('g',21)} },
        23: { description: "Generators boost Warp gain.", cost: new Decimal(100), effect(){ return player.g.points.add(1).pow(0.3)}, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('g',22) && player.w.unlocked }},
        31: { description: "Unlock G challenge: Blackout.", cost: new Decimal(250), unlocked(){ return hasUpgrade('g',23)} },
        32: { description: "Keep G grid on reset.", cost: new Decimal(500), unlocked(){ return hasUpgrade('g',31)} },
        33: { description: "G milestones give +1 Mana.", cost: new Decimal(1000), effect(){ return new Decimal(1)}, unlocked(){ return hasUpgrade('g',32) && player.m.unlocked }},
    },
    challenges: {
        11: {
            name: "Blackout", challengeDescription: "Point gain ^0.4, G effect disabled.",
            goalDescription: "Reach 1e9 points", canComplete(){ return player.points.gte(1e9)},
            rewardDescription: "G effect x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('g',31)},
        }
    },
    buyables: {
        11: {
            title: "Generator Mk I", cost(x) { if (x.gte(10)) x = x.pow(1.5).div(10).pow(0.5); return new Decimal(5).pow(x).times(10) },
            effect(x) { let eff = Decimal.pow(1.8, x); return eff },
            display() { let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" prestige<br>Amount: "+formatWhole(player.g.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to G effect" },
            unlocked() { return true }, canAfford() { return player.p.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() { let c=tmp[this.layer].buyables[this.id].cost; player.p.points=player.p.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style: {'height':'120px'}, purchaseLimit: new Decimal(25),
        },
        12: {
            title: "Generator Mk II", cost(x) { return new Decimal(1000).pow(x).times(1e6) }, effect(x) { return Decimal.pow(10, x) },
            display() { let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" points<br>Amount: "+formatWhole(player.g.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points" },
            unlocked() { return hasMilestone('g', 2) }, canAfford() { return player.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy() { let c=tmp[this.layer].buyables[this.id].cost; player.points=player.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style: {'height':'120px'},
        },
        13: {
            title: "Generator Core", cost(x){ return new Decimal(1e6).pow(x).times(1e12) }, effect(x){ return Decimal.pow(5, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" points<br>Amount: "+formatWhole(player.g.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to Warp gain"},
            unlocked(){ return hasMilestone('g',5)}, canAfford(){ return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.points=player.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    clickables: {
        11: {
            title: "Overclock!", display() { return "Click to gain 10% of G gain instantly!<br>Cooldown: "+format(player.g.clickables[11] || 0)+"s" },
            canClick() { return (player.g.clickables[11]||0) <= 0 }, onClick() { let gain = tmp.g.resetGain.times(0.1).max(1); player.g.points = player.g.points.add(gain); player.g.clickables[11] = 5 },
            style: {'height':'100px', 'background-color':'#004488'}, unlocked() { return hasMilestone('g', 1) },
        },
        12: {
            title: "Grid Overload", display(){ return "Spend 20 G to +1 all grid tiles<br>Cost: 20 G" },
            canClick(){ return player.g.points.gte(20) && hasMilestone('g',4) }, onClick(){ if(player.g.points.gte(20)){ player.g.points=player.g.points.sub(20); for(let id in player.g.grid) if(player.g.grid[id]<2) player.g.grid[id]++; }},
            style:{'height':'80px','background-color':'#005500'}, unlocked(){ return hasUpgrade('g',21)},
        },
    },
    milestones: {
        0: { requirementDescription: "2 generators", effectDescription: "Prestige gain x2, keep P upgrades", done() {return player.g.best.gte(2)} },
        1: { requirementDescription: "5 generators", effectDescription: "Unlock clickables + keep G buyables on reset", done() {return player.g.best.gte(5)}, unlocked() {return hasMilestone('g',0)} },
        2: { requirementDescription: "10 generators", effectDescription: "Unlock Mk II buyable & bars", done() {return player.g.best.gte(10)}, unlocked() {return hasMilestone('g',1)} },
        3: { requirementDescription: "20 generators", effectDescription: "Gain 50% of G gain per second passively", done() {return player.g.best.gte(20)}, unlocked() {return hasMilestone('g',2)} },
        4: { requirementDescription: "35 generators", effectDescription: "Unlock Grid", done(){ return player.g.best.gte(35)}, unlocked(){return hasMilestone('g',3)} },
        5: { requirementDescription: "60 generators", effectDescription: "Unlock Core buyable, keep grid", done(){ return player.g.best.gte(60)}, unlocked(){return hasMilestone('g',4)} },
    },
    update(diff) { if (player.g.clickables[11] > 0) player.g.clickables[11] = Math.max(0, player.g.clickables[11] - diff) },
    passiveGeneration() { return hasMilestone('g', 3) ? 0.5 : 0 },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = []
            if (hasMilestone('g', 0)) keep.push("milestones")
            if (hasMilestone('g', 1)) keep.push("buyables")
            if (hasMilestone('g', 4) && hasUpgrade('g',32)) keep.push("grid")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: {
        "Generators": { content: ["main-display","prestige-button","resource-display","blank",["bar","power"],"blank","milestones","blank","upgrades","blank","buyables","blank","clickables"]},
        "Grid": { content: [["display-text", function(){return "Grid: Spend 5 G per tile. Overcharged tiles give huge bonus!"}], "blank","grid","blank",["bar","gridPower"],"blank","clickables"], unlocked(){ return hasMilestone('g',4)}},
        "Stats": { content: [["display-text", function() {return "You have "+formatWhole(player.g.points)+" generators, boosting points by "+format(tmp.g.effect)+"x" }], "blank", ["bar","overcharge"], "blank", ["display-text", function() {return "Mk I amount: "+formatWhole(getBuyableAmount('g',11))+" (effect "+format(buyableEffect('g',11))+"x) | Grid: "+Object.values(player.g.grid).filter(v=>v==2).length+" overcharged"}]], unlocked() {return hasMilestone('g',2)} },
    },
})

// ---------------- ROW 1 RIGHT: MANA (M) - NEW ----------------
addLayer("m", {
    name: "mana", symbol: "M", position: 2,
    startData(){ return { unlocked: false, points: new Decimal(0), best: new Decimal(0), auto: false }},
    color: "#00FF88",
    requires: new Decimal(50), resource: "mana", baseResource: "prestige points", baseAmount(){ return player.p.points },
    type: "normal", exponent: 0.45,
    gainMult(){
        let m=new Decimal(1);
        if(hasUpgrade('m',12)) m=m.times(upgradeEffect('m',12));
        if(hasUpgrade('b',23)) m=m.times(upgradeEffect('b',23));
        if(hasUpgrade('g',33)) m=m.times(2);
        if(hasMilestone('m',2)) m=m.times(2);
        return m;
    },
    gainExp(){ return new Decimal(1)},
    row: 1, branches: ["p"],
    layerShown(){ return hasUpgrade('p',33) || player.m.unlocked },
    effect(){
        let eff=player.m.points.add(1).pow(0.6);
        if(hasUpgrade('m',13)) eff=eff.pow(1.3);
        if(hasUpgrade('p',32)) eff=eff.times(1.2);
        return eff;
    },
    effectDescription(){ return "which boost point & prestige gain by "+format(tmp.m.effect)+"x" },
    bars: {
        manaBar: { direction: RIGHT, width: 320, height: 20, progress(){ return player.m.points.div(50).toNumber()}, display(){ return format(player.m.points)+" / 50 mana"}, fillStyle:{'background-color':"#00FF88"}, baseStyle:{'background-color':"#003322"}, },
        spellCharge: { direction: UP, width: 35, height: 180, progress(){ return getBuyableAmount('m',11).div(10).toNumber()}, display(){ return formatWhole(getBuyableAmount('m',11))+"/10"}, fillStyle:{'background-color':"#88ff88"}, unlocked(){return hasUpgrade('m',11)}, },
    },
    upgrades: {
        11: { description: "Mana boosts prestige gain.", cost: new Decimal(3), effect(){ return player.m.points.add(1).pow(0.5)}, effectDisplay(){return format(this.effect())+"x"} },
        12: { description: "Points boost mana gain.", cost: new Decimal(5), effect(){ return player.points.add(1).log10().add(1).pow(0.6)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('m',11)} },
        13: { description: "Mana effect ^1.3.", cost: new Decimal(10), unlocked(){return hasUpgrade('m',12)} },
        21: { description: "Unlock Mana Spells buyables.", cost: new Decimal(20), unlocked(){return hasUpgrade('m',13)} },
        22: { description: "Mana Spells boost B effect.", cost: new Decimal(50), effect(){ return buyableEffect('m',11).pow(0.3)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('m',21)} },
        23: { description: "Gain 25% mana per second passively.", cost: new Decimal(100), unlocked(){return hasUpgrade('m',22)} },
        31: { description: "Unlock M challenge: Drought.", cost: new Decimal(250), unlocked(){return hasUpgrade('m',23)} },
        32: { description: "Keep M upgrades on W reset.", cost: new Decimal(500), unlocked(){return hasUpgrade('m',31)} },
    },
    buyables: {
        11: {
            title: "Mana Spell", cost(x){ return new Decimal(10).pow(x).times(10) },
            effect(x){ let eff=Decimal.pow(2, x); if(hasUpgrade('m',22)) eff=eff.pow(1.2); return eff; },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" mana<br>Amount: "+formatWhole(player.m.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points"},
            unlocked(){ return hasUpgrade('m',21)}, canAfford(){ return player.m.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.m.points=player.m.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Enchanted Prestige", cost(x){ return new Decimal(100).pow(x).times(1000) },
            effect(x){ return Decimal.pow(3, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" points<br>Amount: "+formatWhole(player.m.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to prestige gain"},
            unlocked(){ return hasMilestone('m',2)}, canAfford(){ return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.points=player.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "Drought", challengeDescription: "Mana gain is ^0.1, point gain ^0.7",
            goalDescription: "Reach 1e9 points", canComplete(){ return player.points.gte(1e9)},
            rewardDescription: "Mana effect x2", rewardEffect(){return new Decimal(2)}, unlocked(){ return hasUpgrade('m',31)},
        }
    },
    clickables: {
        11: {
            title: "Channel Mana", display(){ return "Gain 20% of mana gain<br>Cooldown: "+format(player.m.clickables[11]||0)+"s"},
            canClick(){ return (player.m.clickables[11]||0)<=0 && hasUpgrade('m',21)}, onClick(){ let g=tmp.m.resetGain.times(0.2).max(1); player.m.points=player.m.points.add(g); player.m.clickables[11]=8; },
            style:{'height':'90px','background-color':'#008855'}, unlocked(){ return hasMilestone('m',1)},
        }
    },
    milestones: {
        0: { requirementDescription: "3 mana", effectDescription: "Keep P upgrades, prestige x2", done(){ return player.m.best.gte(3)} },
        1: { requirementDescription: "10 mana", effectDescription: "Unlock Channel, keep M buyables", done(){ return player.m.best.gte(10)}, unlocked(){return hasMilestone('m',0)} },
        2: { requirementDescription: "25 mana", effectDescription: "Mana gain x2, unlock Enchanted buyable", done(){ return player.m.best.gte(25)}, unlocked(){return hasMilestone('m',1)} },
        3: { requirementDescription: "60 mana", effectDescription: "Gain 25% mana passively, keep milestones", done(){ return player.m.best.gte(60)}, unlocked(){return hasMilestone('m',2)} },
    },
    update(diff){ if(player.m.clickables[11]>0) player.m.clickables[11]=Math.max(0, player.m.clickables[11]-diff); },
    passiveGeneration(){ return hasUpgrade('m',23) ? 0.25 : hasMilestone('m',3) ? 0.25 : 0 },
    doReset(resettingLayer){
        if(layers[resettingLayer].row > this.row){
            let keep=[];
            if(hasMilestone('m',0)) keep.push("milestones");
            if(hasMilestone('m',1)) keep.push("buyables");
            if(hasUpgrade('m',32)) keep.push("upgrades");
            layerDataReset(this.layer, keep);
        }
    },
    tabFormat: ["main-display","prestige-button","resource-display","blank",["bar","manaBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","clickables","blank",["bar","spellCharge"]],
})

// ---------------- ROW 2: TIME (T) - Expanded ----------------
addLayer("t", {
    name: "time shards", symbol: "T", position: 0,
    startData() { return { unlocked: false, points: new Decimal(0), best: new Decimal(0), auto: false }},
    color: "#AA00FF",
    requires: new Decimal(2000), resource: "time shards", baseResource: "prestige points", baseAmount() {return player.p.points},
    type: "normal", exponent: 0.3,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('t', 12)) mult = mult.times(2)
        if (hasUpgrade('t', 22)) mult = mult.times(3)
        if (player.b.points.gte(5)) mult = mult.times(player.b.points)
        if (hasUpgrade('p',41)) mult = mult.times(1.5)
        if (hasMilestone('t',4)) mult = mult.times(2)
        return mult
    },
    gainExp() { return new Decimal(1) },
    row: 2, branches: [["b","#FF8800"], ["g","#0080FF"]],
    layerShown() { return hasMilestone('b', 2) && hasMilestone('g', 2) || player.t.unlocked },
    effect() {
        let eff = player.t.points.add(1).pow(0.7)
        if (hasChallenge('t', 11)) eff = eff.times(challengeEffect('t', 11))
        if (hasChallenge('t', 12)) eff = eff.times(challengeEffect('t', 12))
        if (hasUpgrade('t', 23)) eff = eff.pow(1.15)
        return eff
    },
    effectDescription() { return "which are boosting points & prestige by "+format(tmp.t.effect)+"x" },
    infoboxes: {
        lore: {
            title: "The Time Rift",
            body: "At row 2, the tree converges. Time Shards need BOTH boosters and generators. Enter challenges to multiply your power!<br><br>Tip: Do T challenges in order. Reward from 11 helps with 12. New: Try Warp after Time!",
            unlocked() { return true },
        },
    },
    bars: {
        timeBar: { direction: RIGHT, width: 400, height: 25, progress() { return player.t.points.div(player.t.points.add(10)).toNumber() }, display() { return format(player.t.points)+" time shards" }, fillStyle: {'background-color': "#AA00FF"}, unlocked() { return true }, },
        challengeBar: { direction: RIGHT, width: 300, height: 18, progress(){ return new Decimal(challengeCompletions('t',11)+challengeCompletions('t',12)).div(4).toNumber()}, display(){ return "T Challenges: "+(challengeCompletions('t',11)+challengeCompletions('t',12))+"/4"}, fillStyle:{'background-color':"#cc88ff"}, unlocked(){ return hasChallenge('t',11)}, },
    },
    upgrades: {
        11: { description: "Time Shards boost G effect.", cost: new Decimal(1), effect() { return player.t.points.add(1).pow(0.5) }, effectDisplay() { return format(this.effect())+"x" } },
        12: { description: "Double T gain.", cost: new Decimal(2), unlocked() { return hasUpgrade('t', 11) } },
        13: { description: "Unlock Hyper layer.", cost: new Decimal(5), unlocked() { return hasUpgrade('t', 12) } },
        21: { description: "T effect ^1.15 and Warp unlock.", cost: new Decimal(20), effect(){ return new Decimal(1.15)}, unlocked(){ return hasUpgrade('t',13) && hasMilestone('t',2)} },
        22: { description: "T gain x3 and keep B/G on W reset.", cost: new Decimal(50), unlocked(){ return hasUpgrade('t',21)} },
        23: { description: "Time Shards boost Mana gain x2.", cost: new Decimal(100), effect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('t',22)} },
        31: { description: "Unlock T buyables.", cost: new Decimal(500), unlocked(){ return hasUpgrade('t',23) && hasMilestone('t',3)} },
        32: { description: "Auto-prestige T.", cost: new Decimal(2000), unlocked(){ return hasUpgrade('t',31)} },
    },
    buyables: {
        11: {
            title: "Time Accelerator", cost(x){ return new Decimal(10).pow(x).times(10) }, effect(x){ return Decimal.pow(2, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" time shards<br>Amount: "+formatWhole(player.t.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to point gain"},
            unlocked(){ return hasUpgrade('t',31)}, canAfford(){ return player.t.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.t.points=player.t.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Chronal Prestige", cost(x){ return new Decimal(100).pow(x).times(100) }, effect(x){ return Decimal.pow(1.8, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" time shards<br>Amount: "+formatWhole(player.t.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to prestige gain"},
            unlocked(){ return hasUpgrade('t',31) && player.w.unlocked}, canAfford(){ return player.t.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.t.points=player.t.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    clickables: {
        11: {
            title: "Time Warp", display(){ return "Reset T progress but gain 5% of T gain<br>Cooldown: "+format(player.t.clickables[11]||0)+"s"},
            canClick(){ return (player.t.clickables[11]||0)<=0 && player.t.unlocked}, onClick(){ let g=tmp.t.resetGain.times(0.05).max(1); player.t.points=player.t.points.add(g); player.t.clickables[11]=10; },
            style:{'height':'90px','background-color':'#6600aa'}, unlocked(){ return hasMilestone('t',2)},
        }
    },
    challenges: {
        11: {
            name: "Slowdown", challengeDescription: "Point gain is square-rooted (much slower).", goalDescription: "Reach 1e6 points", canComplete() { return player.points.gte(1e6) },
            rewardDescription: "Time effect is stronger (x^1.2)", rewardEffect() { let eff = player.t.points.add(1).pow(0.2); return eff }, rewardDisplay() { return format(this.rewardEffect())+"x" }, unlocked() { return player.t.unlocked },
        },
        12: {
            name: "Taxation", challengeDescription: "You can't buy P upgrades 11-14. Point gain ^0.7", goalDescription: "Reach 5e7 points", canComplete() { return player.points.gte(5e7) },
            rewardDescription: "Gain 2x more prestige points", rewardEffect() { return new Decimal(2) }, rewardDisplay() { return format(this.rewardEffect())+"x" }, unlocked() { return hasChallenge('t', 11) }, countsAs: [11],
        },
        21: {
            name: "Hyper Tax", challengeDescription: "Boosters and Generators do nothing. G effect is disabled.", goalDescription: "Reach 1e10 points", canComplete() { return player.points.gte(1e10) },
            rewardDescription: "Keep B and G milestones on T reset", unlocked() { return hasChallenge('t', 12) },
        },
        22: {
            name: "Mana Drought", challengeDescription: "M effect disabled, P gain ^0.6", goalDescription: "Reach 1e12 points", canComplete(){ return player.points.gte(1e12)},
            rewardDescription: "M effect x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasChallenge('t',21) && player.m.unlocked },
        },
        31: {
            name: "Warped Time", challengeDescription: "W effect disabled, T gain ^0.5", goalDescription: "Reach 1e15 points", canComplete(){ return player.points.gte(1e15)},
            rewardDescription: "T & W gain x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasChallenge('t',22) && player.w.unlocked },
        },
    },
    milestones: {
        0: { requirementDescription: "1 time shard", effectDescription: "Keep B upgrades, gain 10% prestige passively", done() {return player.t.best.gte(1)} },
        1: { requirementDescription: "3 time shards", effectDescription: "Keep G upgrades+buyables, T gain x2", done() {return player.t.best.gte(3)}, unlocked() {return hasMilestone('t',0)} },
        2: { requirementDescription: "8 time shards", effectDescription: "Auto-buy T upgrades, keep T upgrades on next layer", done() {return player.t.best.gte(8)}, unlocked() {return hasMilestone('t',1)} },
        3: { requirementDescription: "25 time shards", effectDescription: "Unlock T buyables & Warp", done(){ return player.t.best.gte(25)}, unlocked(){ return hasMilestone('t',2)} },
        4: { requirementDescription: "100 time shards", effectDescription: "T buyables x2, Warp gain x2", done(){ return player.t.best.gte(100)}, unlocked(){ return hasMilestone('t',3)} },
        5: { requirementDescription: "500 time shards", effectDescription: "Gain 20% T passively", done(){ return player.t.best.gte(500)}, unlocked(){ return hasMilestone('t',4)} },
    },
    update(diff){ if(player.t.clickables[11]>0) player.t.clickables[11]=Math.max(0, player.t.clickables[11]-diff); },
    passiveGeneration(){ return hasMilestone('t',5) ? 0.2 : hasUpgrade('t',32) ? 0.1 : 0 },
    autoUpgrade(){ return hasMilestone('t',2) },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > this.row) {
            let keep = ["milestones"]
            if (hasMilestone('t', 1) || hasChallenge('t', 21)) keep.push("upgrades")
            if (hasMilestone('t', 2)) keep.push("challenges")
            if (hasMilestone('t',3)) keep.push("buyables")
            layerDataReset(this.layer, keep)
        }
    },
    tabFormat: ["main-display","prestige-button","resource-display","blank",["infobox","lore"],"blank",["bar","timeBar"],"blank",["bar","challengeBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","clickables","blank","challenges"],
})

// ---------------- ROW 2 MIDDLE: WARP (W) - NEW ----------------
addLayer("w", {
    name: "warp shards", symbol: "W", position: 1,
    startData(){ return { unlocked:false, points:new Decimal(0), best:new Decimal(0), auto:false }},
    color: "#00AAFF",
    requires: new Decimal(5000), resource: "warp shards", baseResource: "prestige points", baseAmount(){ return player.p.points },
    type: "normal", exponent: 0.28,
    gainMult(){
        let m=new Decimal(1);
        if(hasUpgrade('w',11)) m=m.times(upgradeEffect('w',11));
        if(hasUpgrade('t',31)) m=m.times(2);
        if(player.g.points.gte(10)) m=m.times(player.g.points.div(10).add(1));
        if(hasUpgrade('w',22)) m=m.times(3);
        return m;
    },
    gainExp(){ return new Decimal(1)},
    row: 2, branches: [["g","#0080FF"], ["m","#00FF88"]],
    layerShown(){ return hasMilestone('g',4) && hasMilestone('m',2) || player.w.unlocked },
    effect(){
        let eff=player.w.points.add(1).pow(0.65);
        if(hasChallenge('w',11)) eff=eff.times(challengeEffect('w',11));
        if(hasUpgrade('w',13)) eff=eff.pow(1.2);
        return eff;
    },
    effectDescription(){ return "which boost points and time gain by "+format(tmp.w.effect)+"x"},
    infoboxes: {
        lore: { title: "Warp Rift", body: "Warp needs Generators + Mana. It converges with Time at Row 3. Warp challenges are brutal but Warp buyables are insane!", unlocked(){return true}},
    },
    bars: {
        warpBar: { direction: RIGHT, width: 380, height: 24, progress(){ return player.w.points.div(player.w.points.add(15)).toNumber()}, display(){ return format(player.w.points)+" warp shards"}, fillStyle:{'background-color':"#00AAFF"}, },
        charge: { direction: UP, width: 40, height: 180, progress(){ return getBuyableAmount('w',11).div(10).toNumber()}, display(){ return formatWhole(getBuyableAmount('w',11))+"/10"}, fillStyle:{'background-color':"#88ccff"}, unlocked(){return hasUpgrade('w',12)}, },
    },
    upgrades: {
        11: { description: "Warp boosts point gain.", cost: new Decimal(2), effect(){ return player.w.points.add(1).pow(0.5)}, effectDisplay(){return format(this.effect())+"x"} },
        12: { description: "Warp boosts Time gain.", cost: new Decimal(4), effect(){ return player.w.points.add(1).pow(0.4)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('w',11)} },
        13: { description: "Warp effect ^1.2.", cost: new Decimal(10), unlocked(){return hasUpgrade('w',12)} },
        21: { description: "Unlock Warp buyables.", cost: new Decimal(25), unlocked(){return hasUpgrade('w',13)} },
        22: { description: "Warp gain x3.", cost: new Decimal(60), unlocked(){return hasUpgrade('w',21)} },
        23: { description: "Keep G/M upgrades on W reset.", cost: new Decimal(150), unlocked(){return hasUpgrade('w',22)} },
        31: { description: "Unlock W challenges.", cost: new Decimal(500), unlocked(){return hasUpgrade('w',23)} },
        32: { description: "Auto-warp prestige.", cost: new Decimal(2000), unlocked(){return hasUpgrade('w',31)} },
    },
    buyables: {
        11: {
            title: "Warp Drive", cost(x){ return new Decimal(10).pow(x).times(10) }, effect(x){ return Decimal.pow(2.5, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" warp<br>Amount: "+formatWhole(player.w.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points"},
            unlocked(){ return hasUpgrade('w',21)}, canAfford(){ return player.w.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.w.points=player.w.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Time Dilation", cost(x){ return new Decimal(50).pow(x).times(100) }, effect(x){ return Decimal.pow(1.6, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" time shards<br>Amount: "+formatWhole(player.w.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to Warp gain"},
            unlocked(){ return hasUpgrade('w',21) && player.t.unlocked}, canAfford(){ return player.t.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.t.points=player.t.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        13: {
            title: "Mana Warp", cost(x){ return new Decimal(100).pow(x).times(500) }, effect(x){ return Decimal.pow(3, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" mana<br>Amount: "+formatWhole(player.w.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to Mana gain"},
            unlocked(){ return hasMilestone('w',2)}, canAfford(){ return player.m.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.m.points=player.m.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "Warped", challengeDescription: "All row 1 effects ^0.5, point gain ^0.5",
            goalDescription: "Reach 1e13 points", canComplete(){return player.points.gte(1e13)},
            rewardDescription: "Warp effect x1.5", rewardEffect(){ return new Decimal(1.5)}, unlocked(){ return hasUpgrade('w',31)},
        },
        12: {
            name: "Overwarped", challengeDescription: "You can't gain Warp. Gain is frozen at current warp. Point gain ^0.6",
            goalDescription: "Reach 1e16 points", canComplete(){return player.points.gte(1e16)},
            rewardDescription: "Keep Warp buyables on reset", unlocked(){ return hasChallenge('w',11)},
        },
    },
    milestones: {
        0: { requirementDescription: "2 warp", effectDescription: "Keep G/M upgrades, time gain x2", done(){ return player.w.best.gte(2)} },
        1: { requirementDescription: "6 warp", effectDescription: "Keep Warp upgrades, unlock Q", done(){ return player.w.best.gte(6)}, unlocked(){return hasMilestone('w',0)} },
        2: { requirementDescription: "15 warp", effectDescription: "Unlock Mana Warp buyable, Warp gain x2", done(){ return player.w.best.gte(15)}, unlocked(){return hasMilestone('w',1)} },
        3: { requirementDescription: "40 warp", effectDescription: "Gain 15% Warp passively", done(){ return player.w.best.gte(40)}, unlocked(){return hasMilestone('w',2)} },
    },
    passiveGeneration(){ return hasMilestone('w',3) ? 0.15 : 0 },
    autoPrestige(){ return hasUpgrade('w',32) && hasMilestone('w',1) },
    doReset(resettingLayer){
        if(layers[resettingLayer].row > this.row){
            let keep=[];
            if(hasMilestone('w',0)) keep.push("milestones");
            if(hasMilestone('w',1)) keep.push("upgrades");
            if(hasChallenge('w',12)) keep.push("buyables");
            layerDataReset(this.layer, keep);
        }
    },
    tabFormat: ["main-display","prestige-button","resource-display","blank",["infobox","lore"],"blank",["bar","warpBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","challenges","blank",["bar","charge"]],
})

// ---------------- ROW 3: HYPER (H) - Expanded ----------------
addLayer("h", {
    name: "hyper", symbol: "H", position: 0,
    startData() { return { unlocked: false, points: new Decimal(0), best: new Decimal(0), auto: false }},
    color: "#DD2222",
    requires: new Decimal(20), resource: "hyper points", baseResource: "time shards", baseAmount() {return player.t.points},
    type: "static", base: 2.5, exponent: 1.4, row: 3, branches: ["t"],
    layerShown() { return hasUpgrade('t', 13) || player.h.unlocked },
    effect() {
        let eff = Decimal.pow(100, player.h.points)
        if (hasUpgrade('h', 12)) eff = eff.pow(1.5)
        if (hasUpgrade('h', 22)) eff = eff.pow(1.3)
        if (hasUpgrade('h', 31)) eff = eff.times(buyableEffect('h',11))
        if (eff.gte("1e40")) eff = eff.div("1e40").pow(0.5).times("1e40")
        if (eff.gte("1e100")) eff = eff.div("1e100").pow(0.3).times("1e100")
        return eff
    },
    effectDescription() { return "which are boosting ALL previous gains by "+format(tmp.h.effect)+"x" },
    prestigeButtonText() {
        let gain = (typeof tmp !== 'undefined' && tmp.h && tmp.h.resetGain instanceof Decimal) ? tmp.h.resetGain : getResetGain(this.layer)
        let at = (typeof tmp !== 'undefined' && tmp.h && tmp.h.nextAt instanceof Decimal) ? tmp.h.nextAt : getNextAt(this.layer)
        if (gain.gte(1)) return "Reset for <b>"+formatWhole(gain)+"</b> hyper points<br>Next at "+formatWhole(at)+" time shards"
        return "Need "+formatWhole(at)+" time shards ("+formatWhole(player.t.points)+"/"+formatWhole(at)+")"
    },
    bars: {
        hyperBar: { direction: RIGHT, width: 400, height: 24, progress(){ return player.h.points.div(player.h.points.add(8)).toNumber()}, display(){ return formatWhole(player.h.points)+" hyper"}, fillStyle:{'background-color':"#DD2222"}, },
    },
    upgrades: {
        11: { description: "Hyper points boost T gain.", cost: new Decimal(1), effect() { return player.h.points.add(1).pow(0.8) }, effectDisplay() { return format(this.effect())+"x" } },
        12: { description: "Hyper effect ^1.5", cost: new Decimal(2), unlocked() { return hasUpgrade('h', 11) } },
        13: { description: "Gain 5x more points, unlock Q.", cost: new Decimal(3), unlocked() { return hasUpgrade('h', 12) } },
        21: { description: "Hyper boosts Warp gain.", cost: new Decimal(5), effect(){ return player.h.points.add(1).pow(0.5)}, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('h',13)} },
        22: { description: "Hyper effect ^1.3.", cost: new Decimal(10), unlocked(){ return hasUpgrade('h',21)} },
        23: { description: "Unlock H buyables.", cost: new Decimal(20), unlocked(){ return hasUpgrade('h',22)} },
        31: { description: "H buyable boosts point gain.", cost: new Decimal(50), effect(){ return buyableEffect('h',11)}, effectDisplay(){ return format(this.effect())+"x"}, unlocked(){ return hasUpgrade('h',23)} },
        32: { description: "Unlock H challenges.", cost: new Decimal(100), unlocked(){ return hasUpgrade('h',31)} },
        33: { description: "Keep H upgrades on Q reset.", cost: new Decimal(250), unlocked(){ return hasUpgrade('h',32)} },
    },
    buyables: {
        11: {
            title: "Hyper Core", cost(x){ return new Decimal(5).pow(x).times(5) }, effect(x){ return Decimal.pow(10, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" hyper<br>Amount: "+formatWhole(player.h.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points"},
            unlocked(){ return hasUpgrade('h',23)}, canAfford(){ return player.h.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.h.points=player.h.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Hyper Prestige", cost(x){ return new Decimal(10).pow(x).times(50) }, effect(x){ return Decimal.pow(2, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" hyper<br>Amount: "+formatWhole(player.h.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to prestige gain"},
            unlocked(){ return hasMilestone('h',2)}, canAfford(){ return player.h.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.h.points=player.h.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "Hyper Slow", challengeDescription: "Point gain ^0.6, T gain ^0.5. H effect disabled.",
            goalDescription: "Reach 1e20 points", canComplete(){ return player.points.gte(1e20)},
            rewardDescription: "H effect x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('h',32)},
        },
        12: {
            name: "No Hyper", challengeDescription: "You can't gain Hyper. Point gain ^0.4",
            goalDescription: "Reach 1e25 points", canComplete(){ return player.points.gte(1e25)},
            rewardDescription: "Keep H buyables on reset", unlocked(){ return hasChallenge('h',11)},
        },
    },
    milestones: {
        0: { requirementDescription: "1 hyper", effectDescription: "Keep T milestones and auto-buy T", done() {return player.h.best.gte(1)} },
        1: { requirementDescription: "3 hyper", effectDescription: "Boosters and Generators are 3x cheaper", done() {return player.h.best.gte(3)}, unlocked() {return hasMilestone('h',0)} },
        2: { requirementDescription: "8 hyper", effectDescription: "Unlock Hyper Prestige buyable", done(){ return player.h.best.gte(8)}, unlocked(){return hasMilestone('h',1)} },
        3: { requirementDescription: "20 hyper", effectDescription: "Gain 10% hyper passively", done(){ return player.h.best.gte(20)}, unlocked(){return hasMilestone('h',2)} },
        4: { requirementDescription: "50 hyper", effectDescription: "H effect softcaps later (1e100 → 1e120)", done(){ return player.h.best.gte(50)}, unlocked(){return hasMilestone('h',3)} },
    },
    passiveGeneration(){ return hasMilestone('h',3) ? 0.1 : 0 },
    hotkeys: [{key: "h", description: "H: Reset for hyper points", onPress(){if (canReset(this.layer)) doReset(this.layer)}}],
    doReset(resettingLayer) {
        if(layers[resettingLayer].row > this.row){
            let keep=[];
            if(hasMilestone('h',0)) keep.push("milestones");
            if(hasUpgrade('h',33) || hasChallenge('h',12)) keep.push("upgrades");
            if(hasMilestone('h',2)) keep.push("buyables");
            layerDataReset(this.layer, keep);
        }
    },
    tabFormat: ["main-display",["display-text", function() {return tmp.h.prestigeButtonText}],"blank","resource-display","blank",["bar","hyperBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","challenges"],
})

// ---------------- ROW 3: QUANTUM (Q) - NEW ----------------
addLayer("q", {
    name: "quantum", symbol: "Q", position: 1,
    startData(){ return { unlocked:false, points:new Decimal(0), best:new Decimal(0), auto:false }},
    color: "#00FFAA",
    requires: new Decimal(15), resource: "quantum shards", baseResource: "warp shards", baseAmount(){ return player.w.points },
    type: "static", base: 2.2, exponent: 1.3, row: 3, branches: [["w","#00AAFF"], ["t","#AA00FF"]],
    layerShown(){ return hasUpgrade('h',13) && hasMilestone('w',1) || player.q.unlocked },
    effect(){
        let eff=Decimal.pow(50, player.q.points);
        if(hasUpgrade('q',12)) eff=eff.pow(1.4);
        if(hasUpgrade('q',23)) eff=eff.times(buyableEffect('q',11));
        if(eff.gte("1e60")) eff=eff.div("1e60").pow(0.4).times("1e60");
        return eff;
    },
    effectDescription(){ return "which boost points, warp, and hyper by "+format(tmp.q.effect)+"x"},
    prestigeButtonText(){
        let gain=(tmp.q && tmp.q.resetGain instanceof Decimal) ? tmp.q.resetGain : getResetGain(this.layer);
        let at=(tmp.q && tmp.q.nextAt instanceof Decimal) ? tmp.q.nextAt : getNextAt(this.layer);
        if(gain.gte(1)) return "Reset for <b>"+formatWhole(gain)+"</b> quantum<br>Next at "+formatWhole(at)+" warp";
        return "Need "+formatWhole(at)+" warp ("+formatWhole(player.w.points)+"/"+formatWhole(at)+")";
    },
    infoboxes: {
        lore: { title: "Quantum Foam", body: "Quantum needs Warp + Time. It bridges Row 2 to Eternity. Quantum challenges disable Warp/Time — bring Hyper!", unlocked(){ return true}},
    },
    bars: {
        quantumBar: { direction: RIGHT, width: 380, height: 22, progress(){ return player.q.points.div(player.q.points.add(10)).toNumber()}, display(){ return formatWhole(player.q.points)+" quantum"}, fillStyle:{'background-color':"#00FFAA"}, },
    },
    upgrades: {
        11: { description: "Quantum boosts point gain.", cost: new Decimal(2), effect(){ return player.q.points.add(1).pow(0.7)}, effectDisplay(){return format(this.effect())+"x"} },
        12: { description: "Quantum effect ^1.4 and prestige x2.", cost: new Decimal(5), unlocked(){return hasUpgrade('q',11)} },
        13: { description: "Quantum makes Warp cheaper (cost /1.3).", cost: new Decimal(10), unlocked(){return hasUpgrade('q',12)} },
        21: { description: "Unlock Quantum buyables.", cost: new Decimal(20), unlocked(){return hasUpgrade('q',13)} },
        22: { description: "Quantum boosts Hyper gain.", cost: new Decimal(40), effect(){ return player.q.points.add(1).pow(0.5)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('q',21)} },
        23: { description: "Quantum Core buyable boosts point gain.", cost: new Decimal(80), unlocked(){return hasUpgrade('q',22)} },
        31: { description: "Unlock Q challenges.", cost: new Decimal(150), unlocked(){return hasUpgrade('q',23)} },
        32: { description: "Keep Q upgrades on E reset.", cost: new Decimal(300), unlocked(){return hasUpgrade('q',31)} },
    },
    buyables: {
        11: {
            title: "Quantum Core", cost(x){ return new Decimal(3).pow(x).times(3) }, effect(x){ return Decimal.pow(5, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" quantum<br>Amount: "+formatWhole(player.q.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points"},
            unlocked(){ return hasUpgrade('q',21)}, canAfford(){ return player.q.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.q.points=player.q.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Quantum Flux", cost(x){ return new Decimal(10).pow(x).times(10) }, effect(x){ return Decimal.pow(2, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" quantum<br>Amount: "+formatWhole(player.q.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to prestige"},
            unlocked(){ return hasMilestone('q',2)}, canAfford(){ return player.q.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.q.points=player.q.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "Quantum Lock", challengeDescription: "Warp & Time effects disabled. Point gain ^0.5",
            goalDescription: "Reach 1e30 points", canComplete(){ return player.points.gte(1e30)},
            rewardDescription: "Quantum effect x2", rewardEffect(){ return new Decimal(2)}, unlocked(){ return hasUpgrade('q',31)},
        },
        12: {
            name: "No Quantum", challengeDescription: "Can't gain Quantum. Point gain ^0.4, all row 2 effects ^0.5",
            goalDescription: "Reach 1e35 points", canComplete(){ return player.points.gte(1e35)},
            rewardDescription: "Keep Quantum buyables on reset", unlocked(){ return hasChallenge('q',11)},
        },
    },
    milestones: {
        0: { requirementDescription: "2 quantum", effectDescription: "Keep Warp milestones, hyper gain x2", done(){ return player.q.best.gte(2)} },
        1: { requirementDescription: "5 quantum", effectDescription: "Keep Quantum upgrades, time x2", done(){ return player.q.best.gte(5)}, unlocked(){return hasMilestone('q',0)} },
        2: { requirementDescription: "12 quantum", effectDescription: "Unlock Quantum Flux buyable", done(){ return player.q.best.gte(12)}, unlocked(){return hasMilestone('q',1)} },
        3: { requirementDescription: "25 quantum", effectDescription: "Gain 10% quantum passively", done(){ return player.q.best.gte(25)}, unlocked(){return hasMilestone('q',2)} },
    },
    passiveGeneration(){ return hasMilestone('q',3) ? 0.1 : 0 },
    doReset(resettingLayer){
        if(layers[resettingLayer].row > this.row){
            let keep=[];
            if(hasMilestone('q',0)) keep.push("milestones");
            if(hasUpgrade('q',32) || hasChallenge('q',12)) keep.push("upgrades");
            if(hasMilestone('q',2)) keep.push("buyables");
            layerDataReset(this.layer, keep);
        }
    },
    tabFormat: ["main-display",["display-text", function(){ return tmp.q.prestigeButtonText}],"blank","resource-display","blank",["infobox","lore"],"blank",["bar","quantumBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","challenges"],
})

// ---------------- ROW 4: ETERNITY (E) - NEW ENDGAME ----------------
addLayer("e", {
    name: "eternity", symbol: "E", position: 0,
    startData(){ return { unlocked:false, points:new Decimal(0), best:new Decimal(0) }},
    color: "#FFD700",
    requires: new Decimal(25), resource: "eternity points", baseResource: "hyper points", baseAmount(){ return player.h.points },
    type: "static", base: 3, exponent: 1.5, row: 4, branches: [["h","#DD2222"], ["q","#00FFAA"]],
    layerShown(){ return hasUpgrade('h',13) && hasUpgrade('q',11) || player.e.unlocked },
    effect(){
        let eff=Decimal.pow(1000, player.e.points);
        if(hasUpgrade('e',12)) eff=eff.pow(1.5);
        if(hasUpgrade('e',22)) eff=eff.times(buyableEffect('e',11));
        if(eff.gte("1e200")) eff=eff.div("1e200").pow(0.3).times("1e200");
        return eff;
    },
    effectDescription(){ return "which boost EVERYTHING by "+format(tmp.e.effect)+"x (and unlocks final upgrades)"},
    prestigeButtonText(){
        let gain=(tmp.e && tmp.e.resetGain instanceof Decimal) ? tmp.e.resetGain : getResetGain(this.layer);
        let at=(tmp.e && tmp.e.nextAt instanceof Decimal) ? tmp.e.nextAt : getNextAt(this.layer);
        if(gain.gte(1)) return "Reset for <b>"+formatWhole(gain)+"</b> eternity<br>Next at "+formatWhole(at)+" hyper";
        return "Need "+formatWhole(at)+" hyper ("+formatWhole(player.h.points)+"/"+formatWhole(at)+")";
    },
    bars: {
        eternityBar: { direction: RIGHT, width: 500, height: 30, progress(){ return player.e.points.div(10).toNumber()}, display(){ return formatWhole(player.e.points)+" / 10 Eternity — WIN! ("+format(player.points)+"/1e500)"}, fillStyle:{'background-color':"#FFD700", 'background-image':"linear-gradient(90deg, #FFD700, #FF8800)"}, baseStyle:{'background-color':"#332200"}, textStyle:{'color':"#fff", 'text-shadow':"1px 1px 2px black"}, },
    },
    upgrades: {
        11: { description: "Eternity boosts hyper effect.", cost: new Decimal(1), effect(){ return player.e.points.add(1).pow(1.2)}, effectDisplay(){return format(this.effect())+"x"}, },
        12: { description: "Eternity effect ^1.5 and point gain x10.", cost: new Decimal(2), unlocked(){return hasUpgrade('e',11)} },
        13: { description: "Keep Eternity milestones on reset, time x5.", cost: new Decimal(3), unlocked(){return hasUpgrade('e',12)} },
        21: { description: "Unlock Eternity buyables.", cost: new Decimal(5), unlocked(){return hasUpgrade('e',13)} },
        22: { description: "Eternity Core boosts point gain.", cost: new Decimal(10), effect(){ return buyableEffect('e',11)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('e',21)} },
        23: { description: "Gain 5x more prestige, keep all row 1 upgrades.", cost: new Decimal(15), unlocked(){return hasUpgrade('e',22)} },
        31: { description: "Unlock Eternity challenge: True Eternity.", cost: new Decimal(25), unlocked(){return hasUpgrade('e',23)} },
        32: { description: "Eternity points boost Quantum gain.", cost: new Decimal(50), effect(){ return player.e.points.add(1).pow(0.6)}, effectDisplay(){return format(this.effect())+"x"}, unlocked(){return hasUpgrade('e',31)} },
    },
    buyables: {
        11: {
            title: "Eternity Core", cost(x){ return new Decimal(2).pow(x).times(2) }, effect(x){ return Decimal.pow(10, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" eternity<br>Amount: "+formatWhole(player.e.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to points"},
            unlocked(){ return hasUpgrade('e',21)}, canAfford(){ return player.e.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.e.points=player.e.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
        12: {
            title: "Eternal Prestige", cost(x){ return new Decimal(5).pow(x).times(5) }, effect(x){ return Decimal.pow(5, x)},
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" eternity<br>Amount: "+formatWhole(player.e.buyables[this.id])+"<br>Effect: "+format(d.effect)+"x to all early gains"},
            unlocked(){ return hasMilestone('e',2)}, canAfford(){ return player.e.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ let c=tmp[this.layer].buyables[this.id].cost; player.e.points=player.e.points.sub(c); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'110px'},
        },
    },
    challenges: {
        11: {
            name: "True Eternity", challengeDescription: "All previous effects ^0.3, you can't gain Eternity. Point gain ^0.2",
            goalDescription: "Reach 1e100 points inside", canComplete(){ return player.points.gte("1e100")},
            rewardDescription: "Eternity effect x5", rewardEffect(){ return new Decimal(5)}, unlocked(){ return hasUpgrade('e',31)},
        }
    },
    milestones: {
        0: { requirementDescription: "1 eternity", effectDescription: "Keep H/Q milestones, gain 5x prestige", done(){ return player.e.best.gte(1)} },
        1: { requirementDescription: "3 eternity", effectDescription: "Keep all row 2 upgrades, point gain x5", done(){ return player.e.best.gte(3)}, unlocked(){return hasMilestone('e',0)} },
        2: { requirementDescription: "6 eternity", effectDescription: "Unlock Eternal Prestige buyable", done(){ return player.e.best.gte(6)}, unlocked(){return hasMilestone('e',1)} },
        3: { requirementDescription: "10 eternity", effectDescription: "WIN! + Keep everything on E reset", done(){ return player.e.best.gte(10)}, unlocked(){return hasMilestone('e',2)} },
    },
    hotkeys: [{key: "e", description: "E: Reset for eternity", onPress(){if(canReset(this.layer)) doReset(this.layer)}}],
    tabFormat: ["main-display",["display-text", function(){ return tmp.e.prestigeButtonText}],"blank","resource-display","blank",["bar","eternityBar"],"blank","milestones","blank","upgrades","blank","buyables","blank","challenges"],
})

// ---------------- SIDE: ACHIEVEMENTS (A) - Expanded to 24 ----------------
addLayer("a", {
    startData() { return { unlocked: true }},
    color: "gold", row: "side", layerShown() { return true }, tooltip() { return "Achievements" },
    achievements: {
        11: { name: "Prestigious", done() { return player.p.best.gte(1) }, tooltip: "Get 1 prestige point. Reward: Points x1.5", onComplete() { console.log("First prestige!") } },
        12: { name: "Boosted", done() { return player.b.best.gte(1) }, tooltip: "Get 1 booster. Reward: Points & prestige x1.5", unlocked() { return player.b.unlocked } },
        13: { name: "Generated", done() { return player.g.best.gte(1) }, tooltip: "Get 1 generator. Reward: Points x1.2", unlocked() { return player.g.unlocked } },
        14: { name: "Timely", done() { return player.t.best.gte(1) }, tooltip() { return "Get 1 time shard. Reward: Points x"+format(this.effect()) }, effect() { return player.t.best.add(1).pow(0.15) }, unlocked() { return player.t.unlocked } },
        15: { name: "Mana Flow", done(){ return player.m.best.gte(1)}, tooltip: "Get 1 mana. Reward: Points x1.3", unlocked(){ return player.m.unlocked } },
        16: { name: "Warped", done(){ return player.w.best.gte(1)}, tooltip: "Get 1 warp shard. Reward: Points x1.3", unlocked(){ return player.w.unlocked } },
        21: { name: "Challenge Accepted", done() { return hasChallenge('t', 11) }, tooltip: "Complete Time Challenge 11", unlocked() { return player.t.unlocked } },
        22: { name: "Hyper!", done() { return player.h.best.gte(1) }, tooltip: "Get 1 hyper point.", unlocked() { return player.h.unlocked } },
        23: { name: "Speedrun", done() { return player.points.gte(1e9) && player.h.best.lte(0) }, tooltip: "Reach 1e9 points without any hyper points.", unlocked() { return player.t.unlocked } },
        24: { name: "Overkill", done() { return player.points.gte("1e20") }, tooltip: "Reach 1e20 points", unlocked() { return player.h.unlocked } },
        31: { name: "Quantum Leap", done(){ return player.q.best.gte(1)}, tooltip: "Get 1 quantum shard. Reward: Points x1.5", unlocked(){ return player.q.unlocked } },
        32: { name: "Eternal", done(){ return player.e.best.gte(1)}, tooltip: "Get 1 eternity point.", unlocked(){ return player.e.unlocked } },
        33: { name: "Grid Master", done(){ return Object.values(player.g.grid).filter(v=>v==2).length>=5 }, tooltip: "Get 5 Overcharged grid tiles.", unlocked(){ return hasMilestone('g',4)} },
        34: { name: "Spellweaver", done(){ return getBuyableAmount('m',11).gte(5)}, tooltip: "Get 5 Mana Spells.", unlocked(){ return player.m.unlocked } },
        35: { name: "Time Lord", done(){ return player.t.best.gte(100)}, tooltip: "Get 100 time shards.", unlocked(){ return player.t.unlocked } },
        36: { name: "Warp Lord", done(){ return player.w.best.gte(40)}, tooltip: "Get 40 warp shards.", unlocked(){ return player.w.unlocked } },
        41: { name: "Hyper Lord", done(){ return player.h.best.gte(20)}, tooltip: "Get 20 hyper points.", unlocked(){ return player.h.unlocked } },
        42: { name: "True Eternity", done(){ return hasChallenge('e',11)}, tooltip: "Complete True Eternity challenge.", unlocked(){ return player.e.unlocked } },
        43: { name: "Millionaire", done(){ return player.points.gte("1e100")}, tooltip: "Reach 1e100 points.", unlocked(){ return player.e.unlocked } },
        44: { name: "Secret", done(){ return player.points.gte(69) && player.p.points.gte(69)}, tooltip: "Nice.", unlocked(){ return player.p.unlocked } },
        51: { name: "No Prestige Speedrun", done(){ return player.points.gte(1e6) && player.p.best.lte(0)}, tooltip: "Reach 1e6 points with 0 prestige. Impossible?", unlocked(){ return player.p.unlocked } },
        52: { name: "Collector", done(){ return hasUpgrade('p',42) && hasUpgrade('b',33) && hasUpgrade('g',33) && hasUpgrade('m',32) }, tooltip: "Get all row 1 final upgrades.", unlocked(){ return player.e.unlocked } },
        53: { name: "Completionist", done(){ return Object.keys(player.a.achievements).length>=20}, tooltip: "Get 20 achievements.", unlocked(){ return player.a.achievements.length>=10} },
    },
    tabFormat: ["main-display", "achievements"],
    achievementPopups: true,
})

// ---------------- SIDE: STATS (S) - NEW ----------------
addLayer("s", {
    startData(){ return { unlocked: true }},
    color: "#888888", row: "side", layerShown(){ return true }, tooltip(){ return "Stats & Lore"},
    tabFormat: {
        "Stats": {
            content: [
                "main-display",
                ["display-text", function(){ return "You have "+format(player.points)+" points<br>Best: "+format(player.best || player.points)+" | Total time: "+formatTime(player.timePlayed)}],
                "blank",
                ["display-text", function(){
                    let txt="<b>Layer Breakdown:</b><br>";
                    for(let l of ["p","b","g","m","t","w","h","q","e"]){
                        if(player[l] && player[l].points) txt+= l.toUpperCase()+": "+formatWhole(player[l].points)+" (best "+formatWhole(player[l].best)+")<br>";
                    }
                    return txt;
                }],
                "blank",
                ["infobox","lore"],
                "blank",
                ["bar","hyperBar"],
                ["bar","quantumBar"],
                ["bar","eternityBar"],
            ]
        },
        "Lore": {
            content: [
                ["infobox","story"],
                ["display-text", function(){ return hasAchievement('a',32) ? "<i>You have touched eternity. What comes after?</i>" : "<i>Reach Eternity to unlock the true ending...</i>"}],
            ]
        }
    },
    bars: {
        hyperBar: { direction: RIGHT, width: 300, height: 20, progress(){ return player.h.points.div(10).toNumber()}, display(){ return "Hyper: "+formatWhole(player.h.points)+"/10"}, fillStyle:{'background-color':"#DD2222"}, },
        quantumBar: { direction: RIGHT, width: 300, height: 20, progress(){ return player.q.points.div(10).toNumber()}, display(){ return "Quantum: "+formatWhole(player.q.points)+"/10"}, fillStyle:{'background-color':"#00FFAA"}, },
        eternityBar: { direction: RIGHT, width: 300, height: 20, progress(){ return player.e.points.div(10).toNumber()}, display(){ return "Eternity: "+formatWhole(player.e.points)+"/10 WIN"}, fillStyle:{'background-color':"#FFD700"}, },
    },
    infoboxes: {
        lore: { title: "Progress", body: "This side layer shows your stats across all rows. Row 0 → Row 4 is the main path. Row 1 has 3 branches (B/G/M) that converge into Row 2 (T/W), then Row 3 (H/Q), then Eternity. Each row keeps previous milestones if you earn them!", },
        story: { title: "The Tree's Story", body: "In the beginning there were Points. Then Prestige. Then Boosters and Generators learned to cooperate, and Mana flowed. Time and Warp bent reality, Hyper and Quantum broke it, and Eternity... Eternity remembers. <br><br> Your goal: 10 Eternity Points. Or 1e500 points if you prefer brute force. Good luck.", },
    },
})
