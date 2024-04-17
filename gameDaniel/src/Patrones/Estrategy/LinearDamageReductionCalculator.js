import { BaseRealDamageCalculator } from "./BaseRealDamageCalculator.js";

export class LinearDamageReductionCalculator extends BaseRealDamageCalculator {
    /** @type {number} */
    #damage;
    constructor(damage) {
        super();
        this.#damage = damage;
    }

    calculateDamageReduction(damage) {
        return damage * this.#damage;
    }
}