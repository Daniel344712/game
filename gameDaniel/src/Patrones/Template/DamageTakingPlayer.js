import { DamageTakingCharacterTemplate } from "./DamageTakingCharacterTemplate.js";

export class DamageTakingPlayer extends DamageTakingCharacterTemplate {
    constructor(config, position) {
        super(config, position);
    }

    /**
   * @param {number} realDamage
  */
  takeRealDamage(realDamage) {
    var dodgeChance = 0.2;
    let randomNum = Math.random();
    if (randomNum < dodgeChance) {
      this.setAttackText("Attack dodged");
      return;
    }

    this.setCurrentHealth(this.getCurrentHealth() - realDamage);
  }

  calculateRealDamage(damage) {
    return damage;
  }
}