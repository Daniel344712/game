import { BaseRealDamageCalculator } from "../Estrategy/BaseRealDamageCalculator.js";
import { DamageTakingCharacterTemplate } from "./DamageTakingCharacterTemplate.js";

export class DamageTakingEnemy extends DamageTakingCharacterTemplate{
    /** @type {BaseRealDamageCalculator} */
    #damageReductionStrategy;
    constructor(damageReductionStrategy, config, position) {
        super(config, position);

        this.#damageReductionStrategy = damageReductionStrategy;
    }
    takeRealDamage(realDamage) {
        this.setCurrentHealth(this.getCurrentHealth() - realDamage);
    }

    /**
     * 
     * @param {number} damage
     */
    calculateRealDamage(damage) {
        let realDamage = damage - this.#damageReductionStrategy.calculateDamageReduction(damage);

        this.setAttackText("Resisted " + Number(damage - realDamage) + " damage");

        return realDamage;
    }
}