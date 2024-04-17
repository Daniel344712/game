import { ContantDamageReductionCalculator } from "./ContantDamageReductionCalculator.js";
import { LinearDamageReductionCalculator } from "./LinearDamageReductionCalculator.js";
import { RandomDamageReductionCalculator } from "./RandomDamageReductionCalculator.js";

export class DamageCalculatorContext {

    ChooseDamageReductionStrategy() {
        // get random number between 0 and 2
        var randomNum = Math.floor(Math.random() * 3);

        // if random number is 0, return LinearDamageReductionCalculator
        if (randomNum == 0) {
            return new LinearDamageReductionCalculator(
                0.4
            );
        }
        // if random number is 1, return RandomDamageReductionCalculator
        else if (randomNum == 1) {
            return new RandomDamageReductionCalculator();
        }
        // if random number is 2, return ContantDamageReductionCalculator
        else {
            return new ContantDamageReductionCalculator(5);
        }
    }

}