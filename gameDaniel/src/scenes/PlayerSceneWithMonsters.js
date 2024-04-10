import Phaser from '../lib/phaser.js';
import { WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
import { TILED_COLLISION_LAYER_ALPHA, TILE_SIZE } from '../world/characters/config.js';
import { WorldScene } from './world-scene.js';
import { SceneWithPlayer } from './SceneWithPlayer.js';


export class PlayerSceneWithMonsters extends SceneWithPlayer {
  /** @type {boolean} */
  #wildMonsterEncountered;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  #encounterLayer;
  /** @type {Phaser.Scene} */
  #floorScene;
  /** @type {string} */
  #sceneToLaunch

  /**
   * @param {Phaser.Scene} floor
   * @param {string} sceneToLaunch
   * @param {Object} playerConfig
   */
  constructor(floor, sceneToLaunch, playerConfig) {
    super();

    this.#floorScene = floor;

    this.#sceneToLaunch = sceneToLaunch;

    playerConfig.playerCreatedCallback = this.onPlayerReady.bind(this);
  }

  init() {
    this.#wildMonsterEncountered = false;
  }

  onPlayerReady(createdPlayer) {
    createdPlayer.setMovementFinishedCallback(this.handlePlayerMovementUpdate.bind(this));
  }

  setupEncounterLayer() {
    const map = this.#floorScene.make.tilemap({ key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL });
    const encounterTiles = map.addTilesetImage('encounter', WORLD_ASSET_KEYS.WORLD_ENCOUNTER_ZONE);
    if (!encounterTiles) {
      console.log(`[${WorldScene.name}:create] encounter error while creating encounte tileset using data from tiled`);
      return;
    }

    this.#encounterLayer = map.createLayer('Encounter', encounterTiles, 0, 0);
    if (!this.#encounterLayer) {
      console.log(`[${this.#floorScene.scene.key}:create] encounter error while creating encounter layer using data from tiled`);
      return;
    }

    this.#encounterLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2);
  }

  handlePlayerMovementUpdate() {
    if (this.#encounterLayer === undefined) {
      this.setupEncounterLayer();
    }

    if (!this.#encounterLayer) {
      return;
    }
    const tile = this.#encounterLayer.getTileAtWorldXY(this.#floorScene.getPlayer().sprite.x, this.#floorScene.getPlayer().sprite.y, true);
    if (!tile || tile.index === -1) {
      return;
    }
    console.log(`[${this.#floorScene.scene.key}:handlePlayerMovementUpdate] player is in an encounter zone`);
    this.#wildMonsterEncountered = Math.random() < 0.9;

    if (!this.#encounterLayer) {
      return;
    }
    const isInEncounterZone = this.#encounterLayer.getTileAtWorldXY(this.#floorScene.getPlayer().sprite.x, this.#floorScene.getPlayer().sprite.y, true).index !== -1;

    if (!isInEncounterZone) {
      return;
    }
    console.log(`[${this.#floorScene.scene.key}:handlePlayerMovementUpdate] player is in an encounter zone`);
    this.#wildMonsterEncountered = Math.random() < 0.9;
    if (this.#wildMonsterEncountered) {
      console.log(`[${this.#floorScene.scene.key}:handlePlayerMovementUpdate] player encountered a wildMonster`);
      this.#floorScene.cameras.main.fadeOut(2000);
      this.#floorScene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.launchBattle();
        console.log('Starting Battle Scene...');
      });
    }
  }

  launchBattle() {
    this.#floorScene.scene.pause();
    this.#floorScene.scene.run(this.#sceneToLaunch);
  }

  getScene() {
    return this.#floorScene;
  }
}