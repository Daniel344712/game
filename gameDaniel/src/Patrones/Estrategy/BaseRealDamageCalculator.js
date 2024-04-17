export class BaseRealDamageCalculator {
   /**
     * 
     * @param {number} damage
     * @returns {number}
     */
    calculateDamageReduction(damage) {
        throw new Error('needs to be implemented');
    }
}