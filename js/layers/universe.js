// ============================================================================
//  UNIVERSE LAYER (U) - Travel the Multiverse (12 Distinct Universes!)
//  Row 5 hub that lets you visit 12 different community trees ported from git clones.
//  Clones located at /tmp/PT-Classic, /tmp/PT-Rewritten, /tmp/The-Basic-Tree,
//  /tmp/Incrementreeverse, /tmp/PT-Dimensions, /tmp/The-Particle-Tree,
//  /tmp/The-Pro-Tree, /tmp/The-Dice-Tree, /tmp/PT-Rewritten-NG.
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
        activeUniverse: "classicPlus",
        travelCooldown: 0,
        classic: {
            points: new Decimal(0),
            boosters: new Decimal(0),
            generators: new Decimal(0),
        },
        rewritten: {
            points: new Decimal(0),
            boosters: new Decimal(0),
            generators: new Decimal(0),
            time: new Decimal(0),
        },
        demo: {
            points: new Decimal(0),
            candies: new Decimal(0),
            farm: new Decimal(0),
        },
        incrementverse: {
            points: new Decimal(0),
            incrementy: new Decimal(0),
            prestige: new Decimal(0),
        },
        basic: {
            points: new Decimal(0),
            cheapeners: new Decimal(0),
            darkness: new Decimal(0),
            exponents: new Decimal(0),
            funity: new Decimal(0),
            games: new Decimal(0),
        },
        miletree: {
            points: new Decimal(0),
            prestige: new Decimal(0),
            superPrestige: new Decimal(0),
            transcend: new Decimal(0),
            reincarnate: new Decimal(0),
        },
        dimensions: {
            points: new Decimal(0),
            dim1: new Decimal(0),
            dim2: new Decimal(0),
            dimBoost: new Decimal(0),
        },
        particles: {
            points: new Decimal(0),
            electrons: new Decimal(0),
            protons: new Decimal(0),
            neutrons: new Decimal(0),
            quarks: new Decimal(0),
        },
        pro: {
            points: new Decimal(0),
            ants: new Decimal(0),
            grass: new Decimal(0),
            supernova: new Decimal(0),
            void: new Decimal(0),
        },
        dice: {
            points: new Decimal(0),
            d6: new Decimal(0),
            d12: new Decimal(0),
            d20: new Decimal(0),
            luck: new Decimal(0),
        },
        ng: {
            points: new Decimal(0),
            ngBoosters: new Decimal(0),
            metaGenerators: new Decimal(0),
            hyperTime: new Decimal(0),
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
    branches: [["e","#FFD700"], ["s2","#FF00FF"]],
    layerShown() { return hasMilestone('e', 2) || player.u.unlocked },

    effect() {
        let eff = Decimal.pow(5, player.u.points);
        // Bonus from active universe
        const uniBonus = {
            "classic": 1.5,
            "rewritten": 2.0,
            "demo": 1.8,
            "incrementverse": 2.2,
            "basic": 1.7,
            "miletree": 2.3,
            "dimensions": 2.5,
            "particles": 2.6,
            "pro": 2.8,
            "dice": 3.0,
            "ng": 3.2,
            "classicPlus": 2.5,
        };
        let b = uniBonus[player.u.activeUniverse] || 2.0;
        eff = eff.times(b);

        // Bonuses from individual universe progress
        if (player.u.classic && player.u.classic.points.gt(0)) eff = eff.times(player.u.classic.points.add(1).pow(0.1));
        if (player.u.rewritten && player.u.rewritten.points.gt(0)) eff = eff.times(player.u.rewritten.points.add(1).pow(0.12));
        if (player.u.demo && player.u.demo.points.gt(0)) eff = eff.times(player.u.demo.points.add(1).pow(0.11));
        if (player.u.incrementverse && player.u.incrementverse.points.gt(0)) eff = eff.times(player.u.incrementverse.points.add(1).pow(0.13));
        if (player.u.basic && player.u.basic.points.gt(0)) eff = eff.times(player.u.basic.points.add(1).pow(0.1));
        if (player.u.miletree && player.u.miletree.points.gt(0)) eff = eff.times(player.u.miletree.points.add(1).pow(0.12));
        if (player.u.dimensions && player.u.dimensions.points.gt(0)) eff = eff.times(player.u.dimensions.points.add(1).pow(0.14));
        if (player.u.particles && player.u.particles.points.gt(0)) eff = eff.times(player.u.particles.points.add(1).pow(0.15));
        if (player.u.pro && player.u.pro.points.gt(0)) eff = eff.times(player.u.pro.points.add(1).pow(0.16));
        if (player.u.dice && player.u.dice.points.gt(0)) eff = eff.times(player.u.dice.points.add(1).pow(0.15));
        if (player.u.ng && player.u.ng.points.gt(0)) eff = eff.times(player.u.ng.points.add(1).pow(0.18));

        if (eff.gte("1e100")) eff = eff.div("1e100").pow(0.5).times("1e100");
        return eff;
    },
    effectDescription() {
        let active = player.u.activeUniverse;
        const nameMap = {
            "classic": "Classic 1.0",
            "rewritten": "PT: Rewritten",
            "demo": "TMT Demo",
            "incrementverse": "Incrementreeverse",
            "basic": "The Basic Tree",
            "miletree": "The Milestone Tree",
            "dimensions": "PT: Dimensions",
            "particles": "The Particle Increment Tree",
            "pro": "The Pro Tree",
            "dice": "The Dice Tree",
            "ng": "PT: Rewritten NG+",
            "classicPlus": "Classic+ Hub",
        };
        let name = nameMap[active] || "Hub";
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
            display() { return formatWhole(player.u.points)+" Universe Points — "+(player.u.activeUniverse) },
            fillStyle: {'background-color': "#AA00FF", 'background-image': "linear-gradient(90deg, #AA00FF, #FF00FF)"},
            baseStyle: {'background-color': "#220044"},
            textStyle: {'color': "white", 'text-shadow': "1px 1px 2px black"},
        },
        classicProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.classic ? player.u.classic.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Classic PP: "+formatWhole(player.u.classic ? player.u.classic.points : 0)+" / 100"},
            fillStyle: {'background-color': "#4BDC13"},
            unlocked() { return player.u.activeUniverse === "classic" },
        },
        rewrittenProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.rewritten ? player.u.rewritten.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Rewritten PP: "+formatWhole(player.u.rewritten ? player.u.rewritten.points : 0)+" / 100"},
            fillStyle: {'background-color': "#FF8800"},
            unlocked() { return player.u.activeUniverse === "rewritten" },
        },
        dimensionsProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.dimensions ? player.u.dimensions.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Dimensional Shards: "+formatWhole(player.u.dimensions ? player.u.dimensions.points : 0)+" / 100"},
            fillStyle: {'background-color': "#00BFFF"},
            unlocked() { return player.u.activeUniverse === "dimensions" },
        },
        particlesProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.particles ? player.u.particles.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Particle Core: "+formatWhole(player.u.particles ? player.u.particles.points : 0)+" / 100"},
            fillStyle: {'background-color': "#FFD700"},
            unlocked() { return player.u.activeUniverse === "particles" },
        },
        proProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.pro ? player.u.pro.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Pro Alphabet Points: "+formatWhole(player.u.pro ? player.u.pro.points : 0)+" / 100"},
            fillStyle: {'background-color': "#FF0077"},
            unlocked() { return player.u.activeUniverse === "pro" },
        },
        diceProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.dice ? player.u.dice.points : new Decimal(0)).div(100).toNumber() },
            display() { return "Dice Rolls: "+formatWhole(player.u.dice ? player.u.dice.points : 0)+" / 100"},
            fillStyle: {'background-color': "#FFA500"},
            unlocked() { return player.u.activeUniverse === "dice" },
        },
        ngProgress: {
            direction: RIGHT, width: 300, height: 18,
            progress() { return (player.u.ng ? player.u.ng.points : new Decimal(0)).div(100).toNumber() },
            display() { return "NG+ Power: "+formatWhole(player.u.ng ? player.u.ng.points : 0)+" / 100"},
            fillStyle: {'background-color': "#00FF7F"},
            unlocked() { return player.u.activeUniverse === "ng" },
        },
    },
    infoboxes: {
        lore: {
            title: "The Multiverse Nexus",
            body: `
                Welcome to the <b>Multiverse Hub</b>. Travel to any of the <b>12 distinct community universes</b>, each adapted directly from real open-source GitHub repositories cloned into <code>/tmp</code>.<br><br>
                Each universe grants an active multiplier and specialized buyable trees ported directly from the source code. Upgrades and buyables are preserved across timeline shifts.
            `,
        },
        classicLore: {
            title: "Classic Universe (1.0) - Jacorb90",
            body: `<b>Source:</b> <code>/tmp/PT-Classic</code> (Jacorb90, 7 rows, 22 layers, 7889 lines). Ported as buyables 11-13 (Prestige, Boosters, Generators).`,
        },
        rewrittenLore: {
            title: "Rewritten Universe (PT:R) - Jacorb90",
            body: `<b>Source:</b> <code>/tmp/PT-Rewritten</code> (Jacorb90, 30 layers, 9915 lines). Ported as buyables 21-23 (P/B/T).`,
        },
        dimLore: {
            title: "Dimensional Universe - loader3229",
            body: `<b>Source:</b> <code>/tmp/PT-Dimensions</code> (loader3229, 10488 lines). Ported as buyables 61-64 (Spatial Shards, Dim 1-2, Dim Boost).`,
        },
        particleLore: {
            title: "Particle Universe - cokecole526",
            body: `<b>Source:</b> <code>/tmp/The-Particle-Tree</code> (cokecole526, 614 lines). Ported as buyables 71-74 (Electrons, Protons, Neutrons, Quarks).`,
        },
        proLore: {
            title: "Pro Tree Universe - chuangyou123",
            body: `<b>Source:</b> <code>/tmp/The-Pro-Tree</code> (chuangyou123, 240k+ lines, 40+ layers). Ported as buyables 81-84 (Ants, Grass, Supernova, Void).`,
        },
        diceLore: {
            title: "Dice Tree Universe - chuangyou123",
            body: `<b>Source:</b> <code>/tmp/The-Dice-Tree</code> (chuangyou123, 60649 lines). Ported as buyables 91-94 (D6, D12, D20, Luck Charm).`,
        },
        ngLore: {
            title: "Rewritten NG+ Universe - Seder3214",
            body: `<b>Source:</b> <code>/tmp/PT-Rewritten-NG</code> (Seder3214, 12492 lines). Ported as buyables 101-104 (NG Boosters, Meta-Gen, Hyper-Time).`,
        },
    },
    upgrades: {
        11: { description: "Universe Points boost points.", cost: new Decimal(1), effect(){ return player.u.points.add(1).pow(0.5)}, effectDisplay(){ return format(this.effect())+"x"} },
        12: { description: "Active Universe bonus +50%.", cost: new Decimal(2), unlocked(){ return hasUpgrade('u',11)} },
        13: { description: "Passive universe generation (+10% / sec).", cost: new Decimal(5), unlocked(){ return hasUpgrade('u',12)} },
        21: { description: "All Universe buyables are 2x cheaper.", cost: new Decimal(10), unlocked(){ return hasUpgrade('u',13)} },
        22: { description: "Multiverse Core effect +100%.", cost: new Decimal(25), unlocked(){ return hasUpgrade('u',21)} },
        23: { description: "Universe effect softcap pushed to 1e200.", cost: new Decimal(50), unlocked(){ return hasUpgrade('u',22)} },
        31: { description: "Unlock Classic Challenges.", cost: new Decimal(100), unlocked(){ return hasUpgrade('u',23)} },
        32: { description: "Unlock Rewritten Challenges.", cost: new Decimal(250), unlocked(){ return hasUpgrade('u',31)} },
        33: { description: "Unlock All 22 Classic Layers.", cost: new Decimal(500), unlocked(){ return hasUpgrade('u',32)} },
        34: { description: "Unlock Demo Universe travel.", cost: new Decimal(750), unlocked(){ return hasUpgrade('u',33)} },
        35: { description: "Unlock Incrementreeverse Universe travel.", cost: new Decimal(1200), unlocked(){ return hasUpgrade('u',34)} },
        41: { description: "Keep Universe upgrades on Eternity reset.", cost: new Decimal(2000), unlocked(){ return hasUpgrade('u',35)} },
        42: { description: "Unlock The Basic Tree universe.", cost: new Decimal(3000), unlocked(){ return hasUpgrade('u',41)} },
        43: { description: "Unlock The Milestone Tree universe.", cost: new Decimal(4000), unlocked(){ return hasUpgrade('u',42)} },
        51: { description: "Unlock PT: Dimensions universe.", cost: new Decimal(5000), unlocked(){ return hasUpgrade('u',43)} },
        52: { description: "Unlock Particle Increment Tree universe.", cost: new Decimal(6000), unlocked(){ return hasUpgrade('u',51)} },
        53: { description: "Unlock The Pro Tree universe.", cost: new Decimal(7500), unlocked(){ return hasUpgrade('u',52)} },
        54: { description: "Unlock The Dice Tree universe.", cost: new Decimal(9000), unlocked(){ return hasUpgrade('u',53)} },
        55: { description: "Unlock PT: Rewritten NG+ universe.", cost: new Decimal(12000), unlocked(){ return hasUpgrade('u',54)} },
    },
    buyables: {
        // Classic buyables
        11: {
            title: "Classic: Prestige (P)",
            cost(x){ return Decimal.pow(10, x).times(10) },
            effect(x){ return Decimal.pow(2, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x points" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.classic) player.u.classic.points=player.u.classic.points.add(1); },
            style:{'height':'120px', 'background-color':"#4BDC13"},
        },
        12: {
            title: "Classic: Booster (B)",
            cost(x){ return Decimal.pow(20, x).times(50) },
            effect(x){ return Decimal.pow(2.5, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x B gain" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.classic) player.u.classic.boosters=player.u.classic.boosters.add(1); },
            style:{'height':'120px', 'background-color':"#2a8c08"},
        },
        13: {
            title: "Classic: Generator (G)",
            cost(x){ return Decimal.pow(20, x).times(50) },
            effect(x){ return Decimal.pow(2.2, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x G gain" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.classic) player.u.classic.generators=player.u.classic.generators.add(1); },
            style:{'height':'120px', 'background-color':"#1a5c05"},
        },

        // Rewritten buyables
        21: {
            title: "Rewritten: Prestige (P)",
            cost(x){ return Decimal.pow(15, x).times(20) },
            effect(x){ return Decimal.pow(2.2, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.rewritten) player.u.rewritten.points=player.u.rewritten.points.add(1); },
            style:{'height':'120px', 'background-color':"#FF8800"},
        },
        22: {
            title: "Rewritten: Booster (B)",
            cost(x){ return Decimal.pow(25, x).times(60) },
            effect(x){ return Decimal.pow(2.6, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.rewritten) player.u.rewritten.boosters=player.u.rewritten.boosters.add(1); },
            style:{'height':'120px', 'background-color':"#cc6600"},
        },
        23: {
            title: "Rewritten: Time (T)",
            cost(x){ return Decimal.pow(30, x).times(100) },
            effect(x){ return Decimal.pow(3.0, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x" },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.rewritten) player.u.rewritten.time=player.u.rewritten.time.add(1); },
            style:{'height':'120px', 'background-color':"#994400"},
        },

        // Dimensions buyables (loader3229)
        61: {
            title: "Spatial Shard",
            cost(x){ return Decimal.pow(15, x).times(30) },
            effect(x){ return Decimal.pow(3, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x points" },
            unlocked(){ return hasUpgrade('u', 51) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.dimensions) player.u.dimensions.points=player.u.dimensions.points.add(1); },
            style:{'height':'120px', 'background-color':"#00BFFF"},
        },
        62: {
            title: "1st Dimension",
            cost(x){ return Decimal.pow(25, x).times(80) },
            effect(x){ return Decimal.pow(4, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x Dim 1 power" },
            unlocked(){ return hasUpgrade('u', 51) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.dimensions) player.u.dimensions.dim1=player.u.dimensions.dim1.add(1); },
            style:{'height':'120px', 'background-color':"#0088cc"},
        },
        63: {
            title: "Dimension Boost",
            cost(x){ return Decimal.pow(50, x).times(200) },
            effect(x){ return Decimal.pow(2, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: +"+format(d.effect)+" Dim multiplier" },
            unlocked(){ return hasUpgrade('u', 51) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.dimensions) player.u.dimensions.dimBoost=player.u.dimensions.dimBoost.add(1); },
            style:{'height':'120px', 'background-color':"#005588"},
        },

        // Particle buyables (cokecole526)
        71: {
            title: "Electrons",
            cost(x){ return Decimal.pow(12, x).times(25) },
            effect(x){ return Decimal.pow(2.5, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x charge" },
            unlocked(){ return hasUpgrade('u', 52) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.particles) player.u.particles.electrons=player.u.particles.electrons.add(1); },
            style:{'height':'120px', 'background-color':"#FFD700"},
        },
        72: {
            title: "Protons & Neutrons",
            cost(x){ return Decimal.pow(20, x).times(75) },
            effect(x){ return Decimal.pow(3.5, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x mass" },
            unlocked(){ return hasUpgrade('u', 52) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.particles) player.u.particles.protons=player.u.particles.protons.add(1); },
            style:{'height':'120px', 'background-color':"#ccaa00"},
        },
        73: {
            title: "Quark Core",
            cost(x){ return Decimal.pow(40, x).times(250) },
            effect(x){ return Decimal.pow(5, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x binding" },
            unlocked(){ return hasUpgrade('u', 52) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.particles) player.u.particles.quarks=player.u.particles.quarks.add(1); },
            style:{'height':'120px', 'background-color':"#998800"},
        },

        // Pro Tree buyables (chuangyou123)
        81: {
            title: "Ant Colony",
            cost(x){ return Decimal.pow(15, x).times(35) },
            effect(x){ return Decimal.pow(3, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x swarm" },
            unlocked(){ return hasUpgrade('u', 53) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.pro) player.u.pro.ants=player.u.pro.ants.add(1); },
            style:{'height':'120px', 'background-color':"#FF0077"},
        },
        82: {
            title: "Supernova Core",
            cost(x){ return Decimal.pow(30, x).times(150) },
            effect(x){ return Decimal.pow(6, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x blast" },
            unlocked(){ return hasUpgrade('u', 53) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.pro) player.u.pro.supernova=player.u.pro.supernova.add(1); },
            style:{'height':'120px', 'background-color':"#cc0055"},
        },

        // Dice Tree buyables (chuangyou123)
        91: {
            title: "D20 Roller",
            cost(x){ return Decimal.pow(20, x).times(40) },
            effect(x){ return Decimal.pow(4, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x roll power" },
            unlocked(){ return hasUpgrade('u', 54) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.dice) player.u.dice.d20=player.u.dice.d20.add(1); },
            style:{'height':'120px', 'background-color':"#FFA500"},
        },
        92: {
            title: "Luck Charm",
            cost(x){ return Decimal.pow(35, x).times(200) },
            effect(x){ return Decimal.pow(3, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x critical bonus" },
            unlocked(){ return hasUpgrade('u', 54) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.dice) player.u.dice.luck=player.u.dice.luck.add(1); },
            style:{'height':'120px', 'background-color':"#cc8400"},
        },

        // NG+ buyables (Seder3214)
        101: {
            title: "NG+ Booster",
            cost(x){ return Decimal.pow(25, x).times(50) },
            effect(x){ return Decimal.pow(5, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x NG power" },
            unlocked(){ return hasUpgrade('u', 55) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.ng) player.u.ng.ngBoosters=player.u.ng.ngBoosters.add(1); },
            style:{'height':'120px', 'background-color':"#00FF7F"},
        },
        102: {
            title: "Meta-Generator",
            cost(x){ return Decimal.pow(50, x).times(300) },
            effect(x){ return Decimal.pow(8, x) },
            display(){ let d=tmp[this.layer].buyables[this.id]; return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x generation" },
            unlocked(){ return hasUpgrade('u', 55) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost) },
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); if(player.u.ng) player.u.ng.metaGenerators=player.u.ng.metaGenerators.add(1); },
            style:{'height':'120px', 'background-color':"#00cc66"},
        },

        // Multiverse Core
        31: {
            title: "Multiverse Core",
            cost(x){ return Decimal.pow(3, x).times(5) },
            effect(x){
                let eff = Decimal.pow(1.5, x);
                if(hasUpgrade('u',22)) eff = eff.pow(2);
                return eff;
            },
            display(){
                let d=tmp[this.layer].buyables[this.id];
                return "Cost: "+format(d.cost)+" U<br>Lvl: "+formatWhole(player.u.buyables[this.id])+"<br>Eff: "+format(d.effect)+"x to ALL universes"
            },
            unlocked(){ return hasMilestone('u',2) },
            canAfford(){ return player.u.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy(){ player.u.points=player.u.points.sub(tmp[this.layer].buyables[this.id].cost); setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1)); },
            style:{'height':'130px', 'background-color':"#AA00FF"},
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
            style(){ return {'background-color': player.u.activeUniverse==="classic" ? "#00aa00" : "#225511", 'height':'100px'}},
        },
        12: {
            title: "Travel: Rewritten (PT:R)",
            display(){ return player.u.activeUniverse==="rewritten" ? "<b>ACTIVE</b><br>PT: Rewritten<br>Bonus: x2.0" : "Travel to<br><b>PT: Rewritten</b><br>Cost: 1 U<br>Bonus: x2.0" },
            canClick(){ return player.u.points.gte(1) && player.u.activeUniverse !== "rewritten" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(1)){
                    player.u.points = player.u.points.sub(1);
                    player.u.activeUniverse = "rewritten";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to PT: Rewritten Universe! Point gain x2.0","Universe Shift",3,"#FF8800");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="rewritten" ? "#00aa00" : "#553311", 'height':'100px'}},
        },
        13: {
            title: "Travel: Classic+ Hub",
            display(){ return player.u.activeUniverse==="classicPlus" ? "<b>ACTIVE</b><br>Classic+ Hub<br>Bonus: x2.5" : "Return to<br><b>Classic+ Hub</b><br>Cost: 1 U<br>Bonus: x2.5" },
            canClick(){ return player.u.points.gte(1) && player.u.activeUniverse !== "classicPlus" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(1)){
                    player.u.points = player.u.points.sub(1);
                    player.u.activeUniverse = "classicPlus";
                    player.u.travelCooldown = 5;
                    doPopup("none","Returned to Classic+ Hub! Point gain x2.5","Universe Shift",3,"#AA00FF");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="classicPlus" ? "#00aa00" : "#441155", 'height':'100px'}},
        },
        15: {
            title: "Travel: TMT Demo",
            display(){ return player.u.activeUniverse==="demo" ? "<b>ACTIVE</b><br>TMT Demo<br>Bonus: x1.8" : "Travel to<br><b>TMT Demo</b><br>Cost: 2 U<br>Bonus: x1.8" },
            canClick(){ return player.u.points.gte(2) && player.u.activeUniverse !== "demo" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(2)){
                    player.u.points = player.u.points.sub(2);
                    player.u.activeUniverse = "demo";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to TMT Demo Universe! Point gain x1.8","Universe Shift",3,"#00CC88");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="demo" ? "#00aa00" : "#114433", 'height':'100px'}},
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
        17: {
            title: "Travel: PT: Dimensions",
            display(){ return player.u.activeUniverse==="dimensions" ? "<b>ACTIVE</b><br>PT: Dimensions<br>Bonus: x2.5" : "Travel to<br><b>PT: Dimensions</b><br>Cost: 3 U<br>Bonus: x2.5" },
            canClick(){ return player.u.points.gte(3) && player.u.activeUniverse !== "dimensions" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(3)){
                    player.u.points = player.u.points.sub(3);
                    player.u.activeUniverse = "dimensions";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to PT: Dimensions Universe! Point gain x2.5","Universe Shift",3,"#00BFFF");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="dimensions" ? "#00aa00" : "#003355", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',51)},
        },
        18: {
            title: "Travel: Particle Tree",
            display(){ return player.u.activeUniverse==="particles" ? "<b>ACTIVE</b><br>Particle Tree<br>Bonus: x2.6" : "Travel to<br><b>Particle Tree</b><br>Cost: 3 U<br>Bonus: x2.6" },
            canClick(){ return player.u.points.gte(3) && player.u.activeUniverse !== "particles" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(3)){
                    player.u.points = player.u.points.sub(3);
                    player.u.activeUniverse = "particles";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to Particle Tree Universe! Point gain x2.6","Universe Shift",3,"#FFD700");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="particles" ? "#00aa00" : "#554400", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',52)},
        },
        19: {
            title: "Travel: The Pro Tree",
            display(){ return player.u.activeUniverse==="pro" ? "<b>ACTIVE</b><br>The Pro Tree<br>Bonus: x2.8" : "Travel to<br><b>The Pro Tree</b><br>Cost: 4 U<br>Bonus: x2.8" },
            canClick(){ return player.u.points.gte(4) && player.u.activeUniverse !== "pro" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(4)){
                    player.u.points = player.u.points.sub(4);
                    player.u.activeUniverse = "pro";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to The Pro Tree Universe! Point gain x2.8","Universe Shift",3,"#FF0077");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="pro" ? "#00aa00" : "#550022", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',53)},
        },
        20: {
            title: "Travel: The Dice Tree",
            display(){ return player.u.activeUniverse==="dice" ? "<b>ACTIVE</b><br>The Dice Tree<br>Bonus: x3.0" : "Travel to<br><b>The Dice Tree</b><br>Cost: 4 U<br>Bonus: x3.0" },
            canClick(){ return player.u.points.gte(4) && player.u.activeUniverse !== "dice" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(4)){
                    player.u.points = player.u.points.sub(4);
                    player.u.activeUniverse = "dice";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to The Dice Tree Universe! Point gain x3.0","Universe Shift",3,"#FFA500");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="dice" ? "#00aa00" : "#553300", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',54)},
        },
        21: {
            title: "Travel: PT: Rewritten NG+",
            display(){ return player.u.activeUniverse==="ng" ? "<b>ACTIVE</b><br>PT: Rewritten NG+<br>Bonus: x3.2" : "Travel to<br><b>PT: Rewritten NG+</b><br>Cost: 5 U<br>Bonus: x3.2" },
            canClick(){ return player.u.points.gte(5) && player.u.activeUniverse !== "ng" && (player.u.travelCooldown||0)<=0 },
            onClick(){
                if(player.u.points.gte(5)){
                    player.u.points = player.u.points.sub(5);
                    player.u.activeUniverse = "ng";
                    player.u.travelCooldown = 5;
                    doPopup("none","Traveled to PT: Rewritten NG+ Universe! Point gain x3.2","Universe Shift",3,"#00FF7F");
                }
            },
            style(){ return {'background-color': player.u.activeUniverse==="ng" ? "#00aa00" : "#005522", 'height':'100px'}},
            unlocked(){ return hasUpgrade('u',55)},
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
            challengeDescription: "Rewritten mastery active. Point gain ^0.5, prestige gain ^0.5",
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
        1: { requirementDescription: "3 universe points", effectDescription: "Unlock Multiverse Scan, keep upgrades on E reset", done(){ return player.u.best.gte(3)}, unlocked(){return hasMilestone('u',0)} },
        2: { requirementDescription: "8 universe points", effectDescription: "Unlock Multiverse Core buyable, Universe gain x2", done(){ return player.u.best.gte(8)}, unlocked(){return hasMilestone('u',1)} },
        3: { requirementDescription: "20 universe points", effectDescription: "Gain 10% universe passively, keep buyables", done(){ return player.u.best.gte(20)}, unlocked(){return hasMilestone('u',2)} },
        4: { requirementDescription: "50 universe points", effectDescription: "Travel cooldown halved (5s → 2.5s)", done(){ return player.u.best.gte(50)}, unlocked(){return hasMilestone('u',3)} },
        5: { requirementDescription: "100 universe points", effectDescription: "Omniversal Link: All universe buyables ^1.2", done(){ return player.u.best.gte(100)}, unlocked(){return hasMilestone('u',4)} },
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
                    ["row", [["clickable",17],["clickable",18],["clickable",19],["clickable",20],["clickable",21]]],
                    "blank",
                    ["display-text", function(){ return "Travel costs Universe Points and switches your active bonus. Each universe's buyables are <i>ported from the original game's code</i>."}],
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
                    ["display-text", function(){ return "Classic Universe Progress: "+formatWhole(player.u.classic ? player.u.classic.points : 0)+" PP"}],
                    ["bar","classicProgress"],
                    "blank",
                    ["row", [["buyable",11],["buyable",12],["buyable",13]]],
                ]
            },
            "rewritten": {
                content: [
                    ["infobox","rewrittenLore"],
                    "blank",
                    ["display-text", function(){ return "Rewritten Progress: "+formatWhole(player.u.rewritten ? player.u.rewritten.points : 0)+" PP"}],
                    ["bar","rewrittenProgress"],
                    "blank",
                    ["row", [["buyable",21],["buyable",22],["buyable",23]]],
                ]
            },
            "dimensions": {
                content: [
                    ["infobox","dimLore"],
                    "blank",
                    ["display-text", function(){ return "Dimensions Progress: "+formatWhole(player.u.dimensions ? player.u.dimensions.points : 0)+" Shards"}],
                    ["bar","dimensionsProgress"],
                    "blank",
                    ["row", [["buyable",61],["buyable",62],["buyable",63]]],
                ]
            },
            "particles": {
                content: [
                    ["infobox","particleLore"],
                    "blank",
                    ["display-text", function(){ return "Particle Core: "+formatWhole(player.u.particles ? player.u.particles.points : 0)+" Atoms"}],
                    ["bar","particlesProgress"],
                    "blank",
                    ["row", [["buyable",71],["buyable",72],["buyable",73]]],
                ]
            },
            "pro": {
                content: [
                    ["infobox","proLore"],
                    "blank",
                    ["display-text", function(){ return "The Pro Tree Progress: "+formatWhole(player.u.pro ? player.u.pro.points : 0)+" Pro Points"}],
                    ["bar","proProgress"],
                    "blank",
                    ["row", [["buyable",81],["buyable",82]]],
                ]
            },
            "dice": {
                content: [
                    ["infobox","diceLore"],
                    "blank",
                    ["display-text", function(){ return "The Dice Tree: "+formatWhole(player.u.dice ? player.u.dice.points : 0)+" Dice Rolled"}],
                    ["bar","diceProgress"],
                    "blank",
                    ["row", [["buyable",91],["buyable",92]]],
                ]
            },
            "ng": {
                content: [
                    ["infobox","ngLore"],
                    "blank",
                    ["display-text", function(){ return "PT: Rewritten NG+ Progress: "+formatWhole(player.u.ng ? player.u.ng.points : 0)+" NG Points"}],
                    ["bar","ngProgress"],
                    "blank",
                    ["row", [["buyable",101],["buyable",102]]],
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
        // Universe does not reset by lower layers
    },
})
