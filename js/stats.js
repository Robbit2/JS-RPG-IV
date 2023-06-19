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

class Player {
    constructor ({className}){
        this.stats = {};
        for(let stat in classes[className]){
            this.stats[stat] = classes[className][stat];
        }
        this.combatPower = this.getCombatPower();
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
                        <br>♡ HP | ${plr.stats.HP}
                        <br>⚔ Attack | ${plr.stats.Attack}
                        <br>⛨ Armor | ${plr.stats.Armor}
                        <br>🜸 Attack Speed | ${plr.stats["Attack Speed"]}
                        <br>☣ Crit | ${plr.stats.Crit}
                        <br>⚲ Piercing | ${plr.stats.Piercing}
                        <br><h2>♛ Combat Power | ${plr.combatPower}</h2>`;
};

let player = new Player({className: "Warrior"});
renderStats(player);
