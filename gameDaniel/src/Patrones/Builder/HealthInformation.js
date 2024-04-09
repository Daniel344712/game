
export class HealthInformation {
    /**@type {number} */
    currentHp
    /**@type {number} */
    maxHp;
  
    constructor(currentHp, maxHp) {
      this.currentHp = currentHp;
      this.maxHp = maxHp;
    }
  }