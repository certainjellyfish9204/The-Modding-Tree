// ===========================================================================
//  Official Save Bank (community-mod style)
//  Premade milestone snapshots — like Communitree / Multitree / AD Save Bank.
//  Not user backups. Loading one REPLACES the current run after confirm.
// ===========================================================================

function _sbD(x) { return new Decimal(x); }

function _sbFill(p, layer, spec) {
    if (!p[layer]) return;
    p[layer].unlocked = spec.unlocked !== false;
    if (spec.points !== undefined) {
        let d = _sbD(spec.points);
        p[layer].points = d;
        p[layer].best = d;
        p[layer].total = d;
    }
    if (spec.upgrades) p[layer].upgrades = spec.upgrades.slice();
    if (spec.milestones) p[layer].milestones = spec.milestones.slice();
    if (spec.buyables) {
        for (let id in spec.buyables) {
            p[layer].buyables[id] = _sbD(spec.buyables[id]);
        }
    }
    if (spec.challenges) {
        for (let id in spec.challenges) {
            p[layer].challenges[id] = spec.challenges[id];
        }
    }
    if (spec.extra) {
        for (let k in spec.extra) p[layer][k] = spec.extra[k];
    }
}

function _sbAch(p, ids) {
    if (!p.a) return;
    p.a.unlocked = true;
    p.a.achievements = ids.slice();
}

function officialSaveBankList() {
    return [
        {
            id: "fresh",
            category: "Start",
            name: "New Game",
            desc: "Brand-new Classic+ run. 10 points, nothing unlocked.",
            apply: function(p) {
                p.points = _sbD(10);
            }
        },
        {
            id: "row0",
            category: "Hub",
            name: "First Prestige",
            desc: "Just unlocked Prestige. A few P upgrades, ready for Boosters.",
            apply: function(p) {
                p.points = _sbD(100);
                _sbFill(p, "p", {
                    points: 25,
                    upgrades: [11, 12, 13, 14, 21],
                    milestones: [0, 1]
                });
                _sbAch(p, [11, 12]);
            }
        },
        {
            id: "row1",
            category: "Hub",
            name: "Boosters & Generators",
            desc: "Row 1 open: P / B / G / M with early upgrades.",
            apply: function(p) {
                p.points = _sbD(1e6);
                _sbFill(p, "p", { points: 5000, upgrades: [11,12,13,14,21,22,23,24], milestones: [0,1,2,3,4] });
                _sbFill(p, "b", { points: 8, upgrades: [11,12,13,14], milestones: [0,1,2] });
                _sbFill(p, "g", { points: 6, upgrades: [11,12,13], milestones: [0,1] });
                _sbFill(p, "m", { points: 3, upgrades: [11], milestones: [0] });
                _sbAch(p, [11,12,13,14,21,22]);
            }
        },
        {
            id: "row2",
            category: "Hub",
            name: "Time & Warp",
            desc: "Row 2: Time Shards and Warp unlocked. Mid-game hub.",
            apply: function(p) {
                p.points = _sbD(1e15);
                _sbFill(p, "p", { points: 1e8, upgrades: [11,12,13,14,21,22,23,24,31,32,33,34,41], milestones: [0,1,2,3,4,5] });
                _sbFill(p, "b", { points: 25, upgrades: [11,12,13,14,21,22,23], milestones: [0,1,2,3,4] });
                _sbFill(p, "g", { points: 20, upgrades: [11,12,13,14,21], milestones: [0,1,2] });
                _sbFill(p, "m", { points: 15, upgrades: [11], milestones: [0,1] });
                _sbFill(p, "t", { points: 5, upgrades: [11], milestones: [0,1] });
                _sbFill(p, "w", { points: 3, upgrades: [11], milestones: [0] });
                _sbAch(p, [11,12,13,14,15,21,22,23,31,32]);
            }
        },
        {
            id: "row3",
            category: "Hub",
            name: "Hyper & Quantum",
            desc: "Row 3 open. H upgrade 13 has unlocked Quantum.",
            apply: function(p) {
                p.points = _sbD("1e40");
                _sbFill(p, "p", { points: "1e12", upgrades: [11,12,13,14,21,22,23,24,31,32,33,34,41,42,51,52], milestones: [0,1,2,3,4,5,6] });
                _sbFill(p, "b", { points: 60, upgrades: [11,12,13,14,21,22,23,31,32,33], milestones: [0,1,2,3,4,5] });
                _sbFill(p, "g", { points: 50, upgrades: [11,12,13,14,21,22,23], milestones: [0,1,2,3] });
                _sbFill(p, "m", { points: 40, upgrades: [11], milestones: [0,1,2] });
                _sbFill(p, "t", { points: 20, upgrades: [11], milestones: [0,1,2] });
                _sbFill(p, "w", { points: 12, upgrades: [11], milestones: [0,1] });
                _sbFill(p, "h", { points: 8, upgrades: [11,12,13], milestones: [0,1] });
                _sbFill(p, "q", { points: 3, upgrades: [11], milestones: [0] });
                _sbAch(p, [11,12,13,14,15,16,21,22,23,24,31,32,33,41,42]);
            }
        },
        {
            id: "eternity",
            category: "Hub",
            name: "Eternity Unlocked",
            desc: "Row 4 Eternity just opened. Start of late game.",
            apply: function(p) {
                p.points = _sbD("1e80");
                _sbFill(p, "p", { points: "1e20", upgrades: [11,12,13,14,21,22,23,24,31,32,33,34,41,42,51,52,53,54,61], milestones: [0,1,2,3,4,5,6,7] });
                _sbFill(p, "b", { points: 120, upgrades: [11,12,13,14,21,22,23,31,32,33,41], milestones: [0,1,2,3,4,5,6] });
                _sbFill(p, "g", { points: 100, upgrades: [11,12,13,14,21,22,23,31,32,33], milestones: [0,1,2,3,4] });
                _sbFill(p, "m", { points: 80, upgrades: [11], milestones: [0,1,2,3] });
                _sbFill(p, "t", { points: 40, upgrades: [11], milestones: [0,1,2,3] });
                _sbFill(p, "w", { points: 25, upgrades: [11], milestones: [0,1,2] });
                _sbFill(p, "h", { points: 20, upgrades: [11,12,13], milestones: [0,1,2] });
                _sbFill(p, "q", { points: 12, upgrades: [11], milestones: [0,1] });
                _sbFill(p, "e", { points: 2, upgrades: [11], milestones: [0,1,2] });
                _sbAch(p, [11,12,13,14,15,16,21,22,23,24,31,32,33,41,42,43,51,52]);
            }
        },
        {
            id: "multiverse",
            category: "Hub",
            name: "Multiverse Hub",
            desc: "Universe + Reality unlocked. Ready to travel other trees.",
            apply: function(p) {
                p.points = _sbD("1e150");
                _sbFill(p, "p", { points: "1e30", upgrades: [11,12,13,14,21,22,23,24,31,32,33,34,41,42,51,52,53,54,61,62,63], milestones: [0,1,2,3,4,5,6,7,8] });
                _sbFill(p, "b", { points: 200, upgrades: [11,12,13,14,21,22,23,31,32,33,41,42,43,51], milestones: [0,1,2,3,4,5,6,7] });
                _sbFill(p, "g", { points: 180, upgrades: [11,12,13,14,21,22,23,31,32,33,41], milestones: [0,1,2,3,4,5] });
                _sbFill(p, "m", { points: 150, upgrades: [11], milestones: [0,1,2,3,4] });
                _sbFill(p, "t", { points: 80, upgrades: [11], milestones: [0,1,2,3,4] });
                _sbFill(p, "w", { points: 50, upgrades: [11], milestones: [0,1,2,3] });
                _sbFill(p, "h", { points: 40, upgrades: [11,12,13], milestones: [0,1,2,3] });
                _sbFill(p, "q", { points: 30, upgrades: [11], milestones: [0,1,2] });
                _sbFill(p, "e", { points: 12, upgrades: [11], milestones: [0,1,2,3] });
                _sbFill(p, "u", {
                    points: 5,
                    upgrades: [11,12,13,14,21],
                    milestones: [0,1],
                    extra: { activeUniverse: "classicPlus", travelCooldown: 0 }
                });
                _sbFill(p, "r", { points: 3, upgrades: [11], milestones: [0], extra: { stability: _sbD(10) } });
                _sbAch(p, [11,12,13,14,15,16,21,22,23,24,25,31,32,33,41,42,43,51,52,53,61]);
            }
        },
        {
            id: "singularity",
            category: "Hub",
            name: "Singularity (Endgame)",
            desc: "Row 6 Singularity unlocked. Near victory condition.",
            apply: function(p) {
                p.points = _sbD("1e300");
                _sbFill(p, "p", { points: "1e50", upgrades: [11,12,13,14,21,22,23,24,31,32,33,34,41,42,51,52,53,54,61,62,63,64], milestones: [0,1,2,3,4,5,6,7,8] });
                _sbFill(p, "b", { points: 400, upgrades: [11,12,13,14,21,22,23,31,32,33,41,42,43,51,52,53], milestones: [0,1,2,3,4,5,6,7,8] });
                _sbFill(p, "g", { points: 350, upgrades: [11,12,13,14,21,22,23,31,32,33,41,42,43], milestones: [0,1,2,3,4,5,6] });
                _sbFill(p, "m", { points: 300, upgrades: [11], milestones: [0,1,2,3,4] });
                _sbFill(p, "t", { points: 150, upgrades: [11], milestones: [0,1,2,3,4,5] });
                _sbFill(p, "w", { points: 100, upgrades: [11], milestones: [0,1,2,3,4] });
                _sbFill(p, "h", { points: 80, upgrades: [11,12,13], milestones: [0,1,2,3,4] });
                _sbFill(p, "q", { points: 60, upgrades: [11], milestones: [0,1,2,3] });
                _sbFill(p, "e", { points: 25, upgrades: [11], milestones: [0,1,2,3,4] });
                _sbFill(p, "u", {
                    points: 15,
                    upgrades: [11,12,13,14,21,22,23,31,32,33,34,35,41,42,43],
                    milestones: [0,1,2,3],
                    extra: { activeUniverse: "classicPlus", travelCooldown: 0 }
                });
                _sbFill(p, "r", { points: 12, upgrades: [11], milestones: [0,1,2], extra: { stability: _sbD(50) } });
                _sbFill(p, "s2", { points: 3, upgrades: [11,12,13], milestones: [0,1], extra: { field: _sbD(10), collapses: 3 } });
                _sbAch(p, [11,12,13,14,15,16,21,22,23,24,25,31,32,33,41,42,43,51,52,53,61,71,81,91]);
            }
        },
        {
            id: "uni-classic",
            category: "Universes",
            name: "Classic 1.0 start",
            desc: "Multiverse open, sitting in Prestige Tree Classic with travel upgrade.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "classic";
                    p.u.classic.points = _sbD(10);
                    p.u.classic.boosters = _sbD(2);
                    p.u.classic.generators = _sbD(2);
                    if (!p.u.upgrades.includes(14)) p.u.upgrades.push(14);
                    if (!p.u.upgrades.includes(31)) p.u.upgrades.push(31);
                }
            }
        },
        {
            id: "uni-rewritten",
            category: "Universes",
            name: "Rewritten start",
            desc: "Jump to PT: Rewritten universe travel + P/B/T buyables unlocked.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "rewritten";
                    p.u.rewritten.points = _sbD(8);
                    p.u.rewritten.boosters = _sbD(2);
                    p.u.rewritten.time = _sbD(1);
                    [14,21,32].forEach(function(id){ if (p.u.upgrades.indexOf(id)<0) p.u.upgrades.push(id); });
                }
            }
        },
        {
            id: "uni-basic",
            category: "Universes",
            name: "The Basic Tree start",
            desc: "Like the Basic Tree save banks: jump to dust / cheapeners / darkness.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "basic";
                    p.u.basic.points = _sbD(20);
                    p.u.basic.cheapeners = _sbD(4);
                    p.u.basic.darkness = _sbD(1);
                    p.u.basic.exponents = _sbD(0);
                    p.u.basic.funity = _sbD(0);
                    p.u.basic.games = _sbD(0);
                    [14,41,42].forEach(function(id){ if (p.u.upgrades.indexOf(id)<0) p.u.upgrades.push(id); });
                    p.u.points = _sbD(8);
                    p.u.best = _sbD(8);
                }
            }
        },
        {
            id: "uni-basic-late",
            category: "Universes",
            name: "The Basic Tree — Funity",
            desc: "Later Basic Tree snapshot: darkness, exponent, funity rolling.",
            apply: function(p) {
                officialSaveBankById("uni-basic").apply(p);
                if (p.u) {
                    p.u.basic.points = _sbD(1e6);
                    p.u.basic.cheapeners = _sbD(12);
                    p.u.basic.darkness = _sbD(5);
                    p.u.basic.exponents = _sbD(3);
                    p.u.basic.funity = _sbD(1e10);
                    p.u.basic.games = _sbD(1);
                }
            }
        },
        {
            id: "uni-mile",
            category: "Universes",
            name: "Milestone Tree start",
            desc: "Travel into loader3229's Milestone Tree port.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "miletree";
                    p.u.miletree.points = _sbD(15);
                    p.u.miletree.prestige = _sbD(5);
                    p.u.miletree.superPrestige = _sbD(1);
                    [14,41,42,43].forEach(function(id){ if (p.u.upgrades.indexOf(id)<0) p.u.upgrades.push(id); });
                    p.u.points = _sbD(10);
                    p.u.best = _sbD(10);
                }
            }
        },
        {
            id: "uni-inc",
            category: "Universes",
            name: "Incrementreeverse start",
            desc: "pg132 Incrementreeverse — incrementy + prestige stubs.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "incrementverse";
                    p.u.incrementverse.points = _sbD(12);
                    p.u.incrementverse.incrementy = _sbD(8);
                    p.u.incrementverse.prestige = _sbD(3);
                    [14,35].forEach(function(id){ if (p.u.upgrades.indexOf(id)<0) p.u.upgrades.push(id); });
                }
            }
        },
        {
            id: "uni-demo",
            category: "Universes",
            name: "TMT Demo start",
            desc: "Acamaeda Demo universe — candies and farm.",
            apply: function(p) {
                officialSaveBankById("multiverse").apply(p);
                if (p.u) {
                    p.u.activeUniverse = "demo";
                    p.u.demo.points = _sbD(20);
                    p.u.demo.candies = _sbD(15);
                    p.u.demo.farm = _sbD(3);
                    [14,34].forEach(function(id){ if (p.u.upgrades.indexOf(id)<0) p.u.upgrades.push(id); });
                }
            }
        }
    ];
}

function officialSaveBankById(id) {
    let list = officialSaveBankList();
    for (let i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
}

function officialSaveBankCategories() {
    let cats = [];
    let seen = {};
    officialSaveBankList().forEach(function(e) {
        if (!seen[e.category]) { seen[e.category] = true; cats.push(e.category); }
    });
    return cats;
}

function loadOfficialSave(id) {
    let entry = officialSaveBankById(id);
    if (!entry) {
        if (typeof doPopup !== "undefined") doPopup("none", "Unknown save: " + id, "Save Bank", 3, "#ff4444");
        return false;
    }
    if (!confirm("Load official save \"" + entry.name + "\"?\n\nThis REPLACES your current run. Export first if you want to keep it.\n\n" + entry.desc)) {
        return false;
    }
    try {
        // Keep a copy of the current run in a personal slot if the slot system exists
        try { if (typeof saveToSlot === "function") saveToSlot(currentSaveSlot || 0); } catch (e) {}

        let p = getStartPlayer();
        p.versionType = getModID();
        p.version = VERSION.num;
        p.time = Date.now();
        entry.apply(p);
        player = p;
        fixSave();
        versionCheck();
        save();
        window.location.reload();
        return true;
    } catch (e) {
        console.error("[SaveBank]", e);
        if (typeof doPopup !== "undefined") doPopup("none", "Failed to load: " + e.message, "Save Bank", 5, "#ff4444");
        return false;
    }
}
