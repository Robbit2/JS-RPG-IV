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
        this.inventory = [];
        this.gear = {
            "head" : {"src":"./assets/Bacon.png","name":"E","level":100,"stat":[100,"Attack Speed"],"rarity":"Rare"},
            "body" : {"src":"./assets/Bacon.png","name":"E","level":100,"stat":[100,"Attack Speed"],"rarity":"Rare"},
            "legs" : {"src":"./assets/Bacon.png","name":"E","level":100,"stat":[100,"Attack Speed"],"rarity":"Rare"},
            "mainhand" : {"src":"./assets/Bacon.png","name":"E","level":100,"stat":[100,"Attack Speed"],"rarity":"Rare"},
            "offhand" : null
        };
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
    for(let item in gear){
        if(gear[item] !== null){
            document.querySelector(`${gearDom}${item}`).innerHTML = `
            <img src="${gear[item].src}">
            <span id="${item}-tooltip" class="tooltiptext">
                [Lvl.${gear[item].level}] ${gear[item].name}
                <h3>${gear[item].stat[0]} ${gear[item].stat[1]}</h3>
            </span>
            `;
            // sets color for the background of the item icon
            document.querySelector(`${gearDom}${item}`).style.background = `var(--${rarities[gear[item].rarity]})`;
            // hexCode gets the :root variable hex code for the dark version of the item rarity color
            let hexCode = getComputedStyle(document.documentElement).getPropertyValue(`--dark-${rarities[gear[item].rarity]}`);
            // sets the variable to the dark color to prevent from a constant box-shadow
            document.querySelector(`${gearDom}${item}`).style.setProperty("--hover-shadow",hexCode);
        }else{
            document.querySelector(`${gearDom}${item}`).innerHTML = "";
        }
    }
};

let player = new Player({className: "Warrior"});
renderStats(player);
setInterval(() => {
    player.getCombatPower();
    renderStats(player);
    renderGear(player);
}, 50);