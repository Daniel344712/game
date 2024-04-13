import { BATTLE_ASSET_KEYS, DATA_ASSET_KEYS } from '../../assets/asset-keys.js';
import { MonsterDetails } from '../../Patrones/Builder/MonsterDetails.js';
import { CharacterFactory } from '../../Patrones/Factory/characterFactory.js';
import { HealthBar } from '../ui/health-bar.js';

export class BattleMonster {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @protected @type {MonsterDetails} */
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
  /** @protected @type {Phaser.GameObjects.Container} */
  _phaserHealthBarGameContainer;
  /** @protected @type {Phaser.GameObjects.Text} */
  _attackTextGameObject;

  /**
   * @param {import('../../types/typedef.js').BattleMonsterConfig} config
   * @param {import('../../types/typedef.js').Coordinate} position
   */

  constructor(config, position) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;
    this._currentHealth = this._monsterDetails.healthInformation.currentHp;
    this._maxHealth = this._monsterDetails.healthInformation.maxHp;
    this._monsterAttacks = [];

    this._scene.children.add(CharacterFactory.createMonster(config, position));

    this.#createHealthBarComponents(config.scaleHealthBarBackgroundImageByY);
    /** @protected @type {import('../../types/typedef.js').Attack[]} */
    const data = this._scene.cache.json.get(DATA_ASSET_KEYS.ATTACKS)

    this._monsterDetails.attackinformation.attackIds.forEach((attackId) => {
      const monsterAttack = data.find((attack) => attack.id === attackId)
      if (monsterAttack !== undefined) {
        this._monsterAttacks.push(monsterAttack)
      }
    });

    this._attackTextGameObject = new Phaser.GameObjects.Text(
      this._scene,
      position.x,
      position.y - 50,
      '',
      {
        fontFamily: 'Arial',
        fontSize: '15px',
        color: '#FFA500',
        fixedWidth: 5000,
        fixedHeight: 500,
      }
    );
    this._scene.children.add(this._attackTextGameObject);
    this._attackTextGameObject.alpha = 0;
    this._attackTextGameObject.setDepth(10);
  }

  setAttackText(text) {
    this._attackTextGameObject.setText(text);
    this._attackTextGameObject.alpha = 1;
    
    this._scene.time.delayedCall(2000, () => {
      this._attackTextGameObject.alpha = 0;
    });
  }

  /** @type {boolean} */
  get isFainted() {
    return this._currentHealth <= 0;
  }
  get maxHealth() {
    return this._maxHealth;
  }
  set maxHealth(value) {
    this._maxHealth = value;
  }
  get currentHealth() {
    return this._currentHealth;
  }
  set currentHealth(value) {
    this._currentHealth = value;
  }

  set isFainted(value) {
    this._isFainted = value;
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
    return this._monsterDetails.attackinformation.baseAttack;
  }

  /** @type {number} */
  get level() {
    return this._monsterDetails.level;
  }



  setCurrentHealth(value) {
    this._currentHealth = value;
  }

  getCurrentHealth() {
    return this._currentHealth;
  }

  /**
   * @param {number} baseDamage
   * @param {() => void} [callback]
   */
  takeDamage(baseDamage, callback) {
    var realDamage = this.calculateRealDamage(baseDamage);
    this.takeRealDamage(realDamage);
    if (this.getCurrentHealth() < 0)
    {
      this.setCurrentHealth(0);
    }
    this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, { callback });
  }
  takeRealDamage(realDamage) {
    throw new Error('Method not implemented.');
  }
  calculateRealDamage(baseDamage) {
    throw new Error('Method not implemented.');
  }

  takeHealth(health, callback) {
    // update current monster health and animate health bar
    this._currentHealth += health;
    if (this._currentHealth < 0) {
      this._currentHealth = 0;
    }
    this._healthBar.setMeterPercentageAnimated(this._currentHealth / this._maxHealth, { callback });
  }

  #createHealthBarComponents(scaleHealthBarBackgroundImageByY = 1) {
    this._healthBar = new HealthBar(this._scene, 34, 34);

    const monsterNameGameText = this._scene.add.text(30, 20, this.name, {
      color: '#7E3D3F',
      fontSize: '32px',
    });

    const healthBarBgImage = this._scene.add
      .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
      .setOrigin(0)
      .setScale(1, scaleHealthBarBackgroundImageByY);

    const monsterHealthBarLevelText = this._scene.add.text(monsterNameGameText.width + 35, 23, `L${this.level}`, {
      color: '#ED474B',
      fontSize: '28px',
    });

    const monsterHpText = this._scene.add.text(30, 55, 'HP', {
      color: '#FF6505',
      fontSize: '24px',
      fontStyle: 'italic',
    });

    this._phaserHealthBarGameContainer = this._scene.add.container(0, 0, [
      healthBarBgImage,
      monsterNameGameText,
      this._healthBar.container,
      monsterHealthBarLevelText,
      monsterHpText,
    ]);
  }

}