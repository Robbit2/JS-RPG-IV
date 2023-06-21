const classes = {
    "Mage" : {
        "HP" : 100,
        "Attack" : 100,
        "Armor" : 0,
        "Attack Speed" : 100,
        "Crit" : 100,
        "Piercing" : 200
    },
    "Warrior" : {
        "HP" : 400,
        "Attack" : 0,
        "Armor" : 100,
        "Attack Speed" : 50,
        "Crit" : 0,
        "Piercing" : 50
    },
    "Cleric" : {
        "HP" : 250,
        "Attack" : 0,
        "Armor" : 200,
        "Attack Speed" : 50,
        "Crit" : 50,
        "Piercing" : 50
    }
};

const rarities = {
    "Common" : "grey",
    "Uncommon" : "green",
    "Rare" : "blue",
    "Epic" : "purple",
    "Legendary" : "yellow",
    "Mythical" : "teal",
    "Exotic" : "orange",
    "Relic" : "red"
}

const levelPercentIncrease = 4;

const Enemy = {
    "name" : "Goblin",
    "level" : 1,
    "stats" : {
        "HP" : 25,
        "Attack" : 0,
        "Armor" : 20,
        "Attack Speed" : 50,
        "Crit" : 10,
        "Piercing" : 50
    }
};

class Player {
    constructor ({className}){
        this.stats = {};
        this.baseStats = {};
        for(let stat in classes[className]){
            this.stats[stat] = classes[className][stat];
            this.baseStats[stat] = classes[className][stat];
        }
        this.combatPower = this.getCombatPower();
        this.level = 1;
        this.className = className;
        this.xp = 0;
        this.xpNeeded = Math.floor(100*(this.level/1.33)**levelPercentIncrease);
        this.inventory = [];
        this.gear = {
            "head" : null,
            "body" : null,
            "legs" : null,
            "mainhand" : null,
            "offhand" : null
        };
    }
//{"src":"./assets/Bacon.png","name":"Bacon","level":100,"stats":[[100,"Attack Speed"],[2200,"Attack"]],"rarity":"Rare","type":"Weapon"}

    getCombatPower () {
        let combatPower = 0;
        this.combatPower = 0;
        for (let stat in this.stats) {
            combatPower += this.stats[stat];
        }
        this.combatPower = combatPower;
        return combatPower;
    }

    addTotalStats () {
        for(let _ in this.stats){
            this.stats[_] = this.baseStats[_];
        }
        for (let item in this.gear) {
            if(this.gear[item] !== null){
                for(let stat in this.gear[item].stats){
                    let statName = this.gear[item].stats[stat][1];
                    this.stats[statName] += this.gear[item].stats[stat][0];
                }
            }
        }
    }
}

const renderStats = (plr) => {
    let statsDOM = document.querySelector("#stats-text");
    statsDOM.innerHTML = `
        Stats: 
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

const renderGear = (plr) => {
    const gear = plr.gear;
    const gearDom = "#items-";
    for (let item in gear) {
        if (gear[item] !== null) {
            let statsText = "";
            for (let stat in gear[item].stats) {
                let amount = gear[item].stats[stat][0];
                let type = gear[item].stats[stat][1];
                if (amount === 0) {
                    statsText = statsText;
                } else {
                    statsText += `+${amount} ${type}<br>`;
                }
            }
            // hexCode gets the :root variable hex code for the dark version of the item rarity color
            let darkHexCode = getComputedStyle(document.documentElement).getPropertyValue(`--dark-${rarities[gear[item].rarity]}`);
            let HexCode = getComputedStyle(document.documentElement).getPropertyValue(`--${rarities[gear[item].rarity]}`);
            document.querySelector(`${gearDom}${item}`).innerHTML = `
            <img src="${gear[item].src}">
            <span id="${item}-tooltip" class="tooltiptext">
                [Lvl.${gear[item].level}] ${gear[item].name}
                <br><br>
                ${statsText}
                <br>
                <span style="color:${HexCode};"><b>${gear[item].rarity} ${gear[item].type}</b></span>
            </span>
            `;
            // sets color for the background of the item icon
            document.querySelector(`${gearDom}${item}`).style.background = `var(--${rarities[gear[item].rarity]})`;
            // sets the variable to the dark color to prevent from a constant box-shadow
            document.querySelector(`${gearDom}${item}`).style.setProperty("--hover-shadow",darkHexCode);
        }else{
            document.querySelector(`${gearDom}${item}`).innerHTML = "";
            document.querySelector(`${gearDom}${item}`).style.setProperty("--hover-shadow",getComputedStyle(document.documentElement).getPropertyValue(`--dark-grey`))
        }
    }
};

const renderCombat = (plr) => {
    let className = plr.className;
    let classImg = `./assets/Classes/${className}.png`;
    document.querySelector("#player-icon-img").src = classImg;
};

let player = new Player({className: "Cleric"});
renderStats(player);
setInterval(() => {
    player.getCombatPower();
    player.addTotalStats();
    renderStats(player);
    renderGear(player);
    renderCombat(player);
}, 50);