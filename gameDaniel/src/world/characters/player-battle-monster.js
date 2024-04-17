import { DamageTakingPlayer } from "../../Patrones/Template/DamageTakingPlayer.js";

/**
 * @type {import("../../types/typedef.js").Coordinate}
 */
const PLAYER_POSITION = Object.freeze({
  x: 256,
  y: 316,
})

export class PlayerBattleMonster extends DamageTakingPlayer {
  /** @type {Phaser.GameObjects.Text} */
  #healthBarTextGameObject;
  /**
   * 
   * @param {import("../../types/typedef.js").BattleMonsterConfig} config 
   */
  constructor(config) {
    super(config, PLAYER_POSITION);

    this._phaserHealthBarGameContainer.setPosition(556, 318)
    this.#addHealthBarComponents()
  }
  #setHealthBarText() {
    this.#healthBarTextGameObject.setText(`${this._currentHealth}/${this._maxHealth}`)
  }

  #addHealthBarComponents() {
    this.#healthBarTextGameObject = this._scene.add
      .text(443, 80, '25/25', {
        color: '#7E3D3F',
        fontSize: '16px',
      })
      .setOrigin(1, 0);
      
    this._phaserHealthBarGameContainer.add(this.#healthBarTextGameObject)
  }
}