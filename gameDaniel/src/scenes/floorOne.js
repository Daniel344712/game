import Phaser from '../lib/phaser.js';
import { WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
import { SCENE_KEYS } from './scene-keys.js';
import { Player } from '../world/characters/player.js';
import { Controls } from '../utils/controls.js';
import { DIRECTION } from '../common/direction.js';
import { TILED_COLLISION_LAYER_ALPHA, TILE_SIZE } from '../world/characters/config.js';
import { WorldScene } from './world-scene.js';

/** @type {import('../types/typedef.js').Coordinate} */
const PLAYER_POSITION = Object.freeze({
  x: 2 * TILE_SIZE,
  y: 9.2 * TILE_SIZE,
});

export class floorOne extends Phaser.Scene {
  /** @type {Player} */
  #player;
  /** @type {Controls} */
  #controls;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  #encounterLayer;
  /** @type {boolean} */
  #wildMonsterEncountered;

  constructor() {
    super({
      key: SCENE_KEYS.FLOORONE_BACKGROUND,
    });
  }

  init() {
    this.#wildMonsterEncountered = false;
  }

  create() {
    console.log(`[${floorOne.name}:preload] invoked`);
    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.setZoom(0.7);

    const map = this.make.tilemap({ key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL });
    const collisionTiles = map.addTilesetImage('collision', WORLD_ASSET_KEYS.WORLD_COLLISION);
    if (!collisionTiles) {
      console.log(`[${WorldScene.name}:create] encounter error while creating colission tileset using data from tiled`);
      return;
    }
    const encounterTiles = map.addTilesetImage('encounter', WORLD_ASSET_KEYS.WORLD_ENCOUNTER_ZONE);
    if (!encounterTiles) {
      console.log(`[${WorldScene.name}:create] encounter error while creating encounte tileset using data from tiled`);
      return;
    }
    this.#encounterLayer = map.createLayer('Encounter', encounterTiles, 0, 0);
    if (!this.#encounterLayer) {
      console.log(`[${floorOne.name}:create] encounter error while creating encounter layer using data from tiled`);
      return;
    }
    this.#encounterLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2);
    this.add.image(0, 0, WORLD_ASSET_KEYS.FLOORONE_BACKGROUND, 0).setOrigin(0);

    this.#player = new Player({
      scene: this,
      position: PLAYER_POSITION,
      direction: DIRECTION.DOWN,
      spriteGridMovementFinishedCallback: () => {
        this.#handlePlayerMovementUpdate();
      }
    });

    this.cameras.main.startFollow(this.#player.sprite);

    this.#controls = new Controls(this);

    // Agregar texto para explicar el juego
    const instructionText = this.add.text(
        this.#player.sprite.x - 1,
        this.#player.sprite.y - 500,
        '¡Bienvenido a piso uno te encontraras con nuevos monstruos. Recuerda que tienes que ir al siguiente portal para continuar con el siguiente nivel',
        {
          fontFamily: 'Arial',
          fontSize: '15px',
          color: '#ffffff',
          fixedWidth: 5000,
          fixedHeight: 500,
        }
      );
    instructionText.setScrollFactor(0); // Para que el texto se mantenga fijo en la cámara

    // Establecer un temporizador para eliminar el texto después de 5 segundos
    this.time.addEvent({
      delay: 10000, 
      callback: () => {
        instructionText.destroy(); 
      },
      loop: false 
    });

    this.cameras.main.fadeIn(5000, 0, 0, 0);
}


  update() {
    const selectedDirection = this.#controls.getDirectionKeyPressedDown();
    if (selectedDirection !== DIRECTION.NONE) {
      this.#player.moveCharacter(selectedDirection);
    }
  }

  #handlePlayerMovementUpdate() {
    if (!this.#encounterLayer) {
      return;
    }
    const isInEncounterZone = this.#encounterLayer.getTileAtWorldXY(this.#player.sprite.x, this.#player.sprite.y, true).index !== -1;
    if (!isInEncounterZone) {
      return;
    }
    console.log(`[${floorOne.name}:handlePlayerMovementUpdate] player is in an encounter zone`);
    this.#wildMonsterEncountered = Math.random() < 0.9;
    if (this.#wildMonsterEncountered) {
      console.log(`[${floorOne.name}:handlePlayerMovementUpdate] player encountered a wildMonster`);
      this.cameras.main.fadeOut(2000);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        // Aquí deberías iniciar la escena de batalla
        // this.scene.start(SCENE_KEYS.BATTLE_SCENE);
        console.log('Starting Battle Scene...');
      });
    }
  }
}
