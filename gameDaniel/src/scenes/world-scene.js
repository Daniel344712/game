import Phaser from '../lib/phaser.js';
import { WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
import { SCENE_KEYS } from './scene-keys.js';
import { Player } from '../world/characters/player.js';
import { Controls } from '../utils/controls.js';
import { DIRECTION } from '../common/direction.js';
import { TILED_COLLISION_LAYER_ALPHA, TILE_SIZE } from '../world/characters/config.js';

/** @type {import('../types/typedef.js').Coordinate} */
const PLAYER_POSITION = Object.freeze({
  x: 9 * TILE_SIZE,
  y: 20.9 * TILE_SIZE,
});

export class WorldScene extends Phaser.Scene {
  /** @type {Player} */
  #player;
  /** @type {Controls} */
  #controls;
  /** @type {Phaser.GameObjects.Image} */
  #portal;

  constructor() {
    super({
      key: SCENE_KEYS.WORLD_SCENE,
    });
  }

  create() {
    console.log(PLAYER_POSITION)
    console.log(`[${WorldScene.name}:preload] invoked`);
    this.cameras.main.setBounds(0, 0, 1280, 2176);
    this.cameras.main.setZoom(0.8);

    const map = this.make.tilemap({ key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL });
    const collisionTiles = map.addTilesetImage('collision', WORLD_ASSET_KEYS.WORLD_COLLISION);
    if (!collisionTiles) {
      console.log(`[${WorldScene.name}:create] encounter error while creating collision tileset using data from tiled`);
      return;
    }

    const collisionLayer = map.createLayer('Collision', collisionTiles, 0, 0);
    if (!collisionLayer) {
      console.log(`[${WorldScene.name}:create] encounter error while creating collision layer using data from tiled`);
      return;
    }
    collisionLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2);
    this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0);

    // Create and position the portal
    const portal = this.add.image(100, 500, WORLD_ASSET_KEYS.portal, 0);
    portal.setScale(0.1);

    // Store the portal in the class
    this.#portal = portal;

    // Create the player
    this.#player = new Player({
      scene: this,
      position: PLAYER_POSITION,
      direction: DIRECTION.DOWN,

      colissionLayer: collisionLayer,
    });

    // Make the camera follow the player
    this.cameras.main.startFollow(this.#player.sprite);

    // Initialize player controls
    this.#controls = new Controls(this);

    // Fade in the scene
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  update() {
    const x = 320;
    const y = 1337.6;
    const distanceToShop = Phaser.Math.Distance.Between(
      this.#player.sprite.x,
      this.#player.sprite.y,
      x,
      y
    );
    if(distanceToShop < this.#player.sprite.displayWidth / 2 + this.#portal.displayWidth / 2){
      this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }
    const selectedDirection = this.#controls.getDirectionKeyPressedDown();
    if (selectedDirection !== DIRECTION.NONE) {
      this.#player.moveCharacter(selectedDirection);
    }

    // Check the distance between the player and the portal
    const distanceToPortal = Phaser.Math.Distance.Between(
      this.#player.sprite.x,
      this.#player.sprite.y,
      this.#portal.x,
      this.#portal.y
    );

    // Check if the player is close to the portal
    if (distanceToPortal < this.#player.sprite.displayWidth / 2 + this.#portal.displayWidth / 2) {
      // Start the floorOne scene when the player is close to the portal
      this.scene.start(SCENE_KEYS.FLOORONE_BACKGROUND);
    }
  }
}
