import { CharacterFactory } from '../../scenes/characterFactory.js';
import { HealthBar } from '../ui/health-bar.js';

/**
 * @typedef BattleMonsterConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Monster} monsterDetails
 */

/**
 * @typedef Monster
 * @type {Object}
 * @property {string} name
 * @property {string} assetKey
 * @property {number} [assetFrame=0]
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {number} baseAttack
 * @property {number[]} attackIds
 */

/**
 * @typedef Coordinate
 * @type {Object}
 * @property {number} x
 * @property {number} y
 */

export class BattleMonster {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @protected @type {Monster} */
  _monsterDetails;
  /** @protected @type {HealthBar} */
  _healthBar;
  /** @protected @type {Phaser.GameObjects.Image} */
  _phaserGameObject;
    /** @protected @type {number} */
  _currentHealth;
    /** @protected @type {number} */
 _maxHealth;
    /** @protected @type {import('../../types/typedef.js').Attack[]} */
  _monsterAttacks;

  /**
   * @param {import('../../types/typedef.js').BattleMonsterConfig} config
   * @param {import('../../types/typedef.js').Coordinate} position
   */
  constructor(config, position,) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;
    this._currentHealth = this._monsterDetails.currentHp;
    this._maxHealth = this._monsterDetails.maxHp;
    this._monsterAttacks = [];

    this._healthBar = new HealthBar(this._scene, 34, 34);
    this._scene.children.add(CharacterFactory.createSkeleton(config, position));
    //this._phaserGameObject = this._scene.add.image(position.x, position.y,  this._monsterDetails.assetKey,  this._monsterDetails.assetFrame || 0  ).setFlipX(true);

  }
   /** @type {boolean} */
   get isFainted() {
    return this._currentHealth <= 0;
  }

  /** @type {string} */
  get name() {
    return this._monsterDetails.name;
  }

  /** @type {import('../../types/typedef.js').Attack[]} */
  get attacks() {
    return [...this._monsterAttacks];
  }

  /** @type {number} */
  get baseAttack() {
    return this._monsterDetails.baseAttack;
  }

  /**
   * @param {number} damage
   * @param {() => void} [callback]
   */
  takeDamage(damage, callback) {
    // update current monster health and animate health bar
    this._currentHealth -= damage;
    if (this._currentHealth < 0) {
      this._currentHealth = 0;
    }
    this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, { callback });
  }
}