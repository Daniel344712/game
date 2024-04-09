
export class attackInformation {
    /**@type {Array} */
    attackIds
    /**@type {number} */
    baseAttack;
  
    constructor(attackIds, baseAttack) {
      this.attackIds = attackIds;
      this.baseAttack = baseAttack;
    }
  }