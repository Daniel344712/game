import { BattleMonster } from "../../world/characters/battle-character.js";

export class DamageTakingCharacterTemplate extends BattleMonster {
    constructor(config, position) {
        super(config, position);
    }

    /**
   * @param {number} baseDamage
   * @param {() => void} [callback]
   */
    takeDamage(baseDamage, callback) {
        var realDamage = this.calculateRealDamage(baseDamage);
        this.takeRealDamage(realDamage);
        if (this.getCurrentHealth() < 0) {
            this.setCurrentHealth(0);
        }
        this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, { callback });
    }
}