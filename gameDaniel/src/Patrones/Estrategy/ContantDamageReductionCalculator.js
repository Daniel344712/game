import { BaseRealDamageCalculator } from "./BaseRealDamageCalculator.js";

export class ContantDamageReductionCalculator extends BaseRealDamageCalculator{
     /** @type {number} */
     #damage;
     constructor(damage) {
         super();
         this.#damage = damage;
     }
     calculateDamageReduction(damage) {
        return this.#damage;
    }
}