const classes = {
    "Mage" : {
        "HP" : 100,
        "Attack" : 0,
        "Armor" : 0,
        "Attack Speed" : 100,
        "Crit" : 0,
        "Piercing" : 100
    },
    "Warrior" : {
        "HP" : 500,
        "Attack" : 0,
        "Armor" : 0,
        "Attack Speed" : 50,
        "Crit" : 0,
        "Piercing" : 50
    }
};

const levelPercentIncrease = 4;

class Player {
    constructor ({className}){
        this.stats = {};
        for(let stat in classes[className]){
            this.stats[stat] = classes[className][stat];
        }
        this.combatPower = this.getCombatPower();
        this.level = 1;
        this.className = className;
        this.xp = 0;
        this.xpNeeded = Math.floor(100*(this.level/1.33)**levelPercentIncrease);
    }

    getCombatPower () {
        let combatPower = 0;
        this.combatPower = 0;
        for (let stat in this.stats) {
            combatPower += this.stats[stat];
        }
        this.combatPower = combatPower;
        return combatPower;
    }
}

const renderStats = (plr) => {
    let statsDOM = document.querySelector("#stats");
    statsDOM.innerHTML = `Stats: 
                        <br>♡ HP | ${numeral(plr.stats.HP).format("0.[00]a")}
                        <br>⚔ Attack | ${numeral(plr.stats.Attack).format("0.[00]a")}
                        <br>⛨ Armor | ${numeral(plr.stats.Armor).format("0.[00]a")}
                        <br>🜸 Attack Speed | ${numeral(plr.stats["Attack Speed"]).format("0.[00]a")}
                        <br>☣ Crit | ${numeral(plr.stats.Crit).format("0.[00]a")}
                        <br>⚲ Piercing | ${numeral(plr.stats.Piercing).format("0.[00]a")}
                        <br><h2>♛ Combat Power | ${numeral(plr.combatPower).format("0.[00]a")}</h2>`;
    renderXp(plr);
};

const renderXp = (plr) => {
    document.querySelector("#player-title").innerHTML = `[Lvl.${plr.level}] ${plr.className}`;
    document.querySelector("#expText").innerHTML = `${numeral(plr.xp).format("0.[00]a")} / ${numeral(plr.xpNeeded).format("0.[00]a")}`;
    document.querySelector("#expBar").value = plr.xp;
    document.querySelector("#expBar").max = plr.xpNeeded
};

const save = (plr) => {
    localStorage.gameSave = JSON.stringify(plr);
    return true;
};

let player = new Player({className: "Warrior"});
renderStats(player);
setInterval(() => {
    player.getCombatPower();
    renderStats(player);
}, 50)