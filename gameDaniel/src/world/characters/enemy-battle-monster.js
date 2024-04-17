import { BaseRealDamageCalculator } from "../../Patrones/Estrategy/BaseRealDamageCalculator.js";
import { DamageTakingEnemy } from "../../Patrones/Template/DamageTakingEnemy.js";

/**
 * @type {import("../../types/typedef.js").Coordinate}
 */
const ENEMY_POSITION = Object.freeze({
    x: 768,
    y: 144,
})

export class EnemyBattleMonster extends DamageTakingEnemy {
    /**
     * @param {BaseRealDamageCalculator} damageReductionStrategy
     * @param {import("../../types/typedef.js").BattleMonsterConfig} config 
     */
    constructor(damageReductionStrategy, config) {
        super(damageReductionStrategy, { ...config, scaleHealthBarBackgroundImageByY: 0.8 }, ENEMY_POSITION)
    }

   
}