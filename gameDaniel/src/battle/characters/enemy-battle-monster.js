import { BattleMonster } from "./battle-character.js";
/**
 * @type {import("../../types/typedef").Coordinate}
 */
const ENEMY_POSITION = Object.freeze({
    x: 768,
    y: 144,
})

export class EnemyBattleMonster extends BattleMonster {
    /**
     * 
     * @param {import("../../types/typedef").BattleMonsterConfig} config 
     */
    constructor(config) {
        super({ ...config, scaleHealthBarBackgroundImageByY: 0.8 }, ENEMY_POSITION)
    }

    takeRealDamage(realDamage) {
        this.setCurrentHealth(this.getCurrentHealth() - realDamage);
    }

    calculateRealDamage(damage) {
        let randomPercentage = Math.random() * (100 - 50) + 50;


        let realDamage = Math.floor(damage * (randomPercentage / 100));

        this.setAttackText("Resisted " + Number(damage - realDamage) + " damage");

        return realDamage;
    }
}