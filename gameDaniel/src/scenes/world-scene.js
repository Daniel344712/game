import Phaser from '../lib/phaser.js';
import { WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
import { SCENE_KEYS } from './scene-keys.js';
import { Player } from '../world/characters/player.js';
import { Controls } from '../utils/controls.js';
import { DIRECTION } from '../common/direction.js';
import { TILED_COLLISION_LAYER_ALPHA, TILE_SIZE } from '../world/characters/config.js';

/** @type {import('../types/typedef.js').Coordinate} */
const PLAYER_POSITION = Object.freeze({
  x: 6 * TILE_SIZE,
  y: 21 * TILE_SIZE,
});

export class WorldScene extends Phaser.Scene {
  /** @type {Player} */
  #player;
  /** @type {Controls} */
  #controls;

  constructor() {
    super({
      key: SCENE_KEYS.WORLD_SCENE,
    });
  }

  create() {
    const x = 6 * TILE_SIZE;
    const y = 22 * TILE_SIZE
    console.log(`[${WorldScene.name}:preload] invoked`);
    this.cameras.main.setBounds(0,0, 1280, 2176)
    this.cameras.main.setZoom(0.8)
    this.cameras.main.centerOn(x, y)
    const map = this.make.tilemap({ key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL})
    const collisionTiles = map.addTilesetImage('collision', WORLD_ASSET_KEYS.WORLD_COLLISION)
    if(!collisionTiles){
      console.log(`[${WorldScene.name}:create] encounter error while creating colission tileset using data from tiled`);
     return
    }

    const colissionLayer = map.createLayer('Collision', collisionTiles, 0,0)
    if(!colissionLayer){
      console.log(`[${WorldScene.name}:create] encounter error while creating colission layer using data from tiled`);
      return;
    }
   colissionLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2)
    this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0);

    this.#player = new Player({
      scene: this,
      position: PLAYER_POSITION,
      direction: DIRECTION.DOWN,
      colissionLayer: colissionLayer,
    });
   this.cameras.main.startFollow(this.#player.sprite)
//this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_FOREGROUND, 0).setOrigin(0);
    this.#controls = new Controls(this);

    this.cameras.main.fadeIn(1000, 0, 0, 0)
  }

  update() {
    const selectedDirection = this.#controls.getDirectionKeyPressedDown();
    if (selectedDirection !== DIRECTION.NONE) {
      this.#player.moveCharacter(selectedDirection);
    }
  }
}
