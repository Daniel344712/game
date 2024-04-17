import { BaseRealDamageCalculator } from "./BaseRealDamageCalculator.js";

export class RandomDamageReductionCalculator extends BaseRealDamageCalculator{
    calculateDamageReduction(damage) {
        let randomPercentage = Math.random() * (100 - 50) + 50;

        let realDamage = Math.floor(damage * (randomPercentage / 100));
    
        return realDamage
    }
  
}