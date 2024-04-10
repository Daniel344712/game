import Phaser from '../lib/phaser.js';
import { Player } from '../world/characters/player.js';

export class SceneWithPlayer extends Phaser.Scene {
  /** @type {Player} */
  #player;
  /** @type {Object} */
  #playerConfig

  constructor(sceneKey, playerConfig) {
    super({
      key: sceneKey,
    });

    if (playerConfig != undefined && playerConfig != null) {
      this.#playerConfig = playerConfig;
    }
  }

  create() {
    this.#player = new Player(this.#playerConfig);
  }

  getPlayer() {
    return this.#player;
  }
}