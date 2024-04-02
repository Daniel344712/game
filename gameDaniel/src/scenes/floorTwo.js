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
  y: 11.9* TILE_SIZE,
});


export class floorTwo extends Phaser.Scene {
  /** @type {Player} */
  #player;
  /** @type {Controls} */
  #controls;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  #encounterLayer;
  /** @type {boolean} */
  #wildMonsterEncountered;
  /** @type {Phaser.GameObjects.Image} */
  #portal;

  constructor() {
    super({
      key: SCENE_KEYS.FLOORTWO_BACKGROUND,
    });
  }

  init() {
    this.#wildMonsterEncountered = false;
  }

  create() {
    console.log(`[${floorTwo.name}:preload] invoked`);
    this.cameras.main.setBounds(0, 0, 1100, 900);
    this.cameras.main.setZoom(0.7);

    const map = this.make.tilemap({ key: WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL });

    const encounterTiles = map.addTilesetImage('encounter', WORLD_ASSET_KEYS.WORLD_ENCOUNTER_ZONE);
    if (!encounterTiles) {
      console.log(`[${WorldScene.name}:create] encounter error while creating encounte tileset using data from tiled`);
      return;
    }
    this.#encounterLayer = map.createLayer('Encounter', encounterTiles, 0, 0);
    if (!this.#encounterLayer) {
      console.log(`[${floorTwo.name}:create] encounter error while creating encounter layer using data from tiled`);
      return;
    }
    this.#encounterLayer.setAlpha(TILED_COLLISION_LAYER_ALPHA).setDepth(2);
    this.add.image(0, 0, WORLD_ASSET_KEYS.FLOORTWO_BACKGROUND, 0).setOrigin(0);
    let portal =  this.add.image(0, 0, WORLD_ASSET_KEYS.portal, 0);
    portal.setScale(0.1);
    portal.setPosition(1400,500);

    // Store the portal in the class
    this.#portal = portal;

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
        '¡Bienvenido a piso dos te encontraras con nuevos monstruos. Recuerda que tienes que ir al siguiente portal para continuar con el siguiente nivel',
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

    // Check the distance between the player and the portal
    const distanceToPortal = Phaser.Math.Distance.Between(
      this.#player.sprite.x, 
      this.#player.sprite.y, 
      this.#portal.x, 
      this.#portal.y
    );

    // Check if the player is close to the portal
    if (distanceToPortal < this.#player.sprite.displayWidth / 2 + this.#portal.displayWidth / 2) {
      // Start the new scene
      this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }
  }

  #handlePlayerMovementUpdate() {
    if (!this.#encounterLayer) {
      return;
    }
    const tile = this.#encounterLayer.getTileAtWorldXY(this.#player.sprite.x, this.#player.sprite.y, true);
    if (!tile || tile.index === -1) {
      return;
    }
    console.log(`[${floorTwo.name}:handlePlayerMovementUpdate] player is in an encounter zone`);
    this.#wildMonsterEncountered = Math.random() < 0.9;
    
    if (!this.#encounterLayer) {
      return;
    }
    const isInEncounterZone = this.#encounterLayer.getTileAtWorldXY(this.#player.sprite.x, this.#player.sprite.y, true).index !== -1;

    if (!isInEncounterZone) {
      return;
    }
    console.log(`[${floorTwo.name}:handlePlayerMovementUpdate] player is in an encounter zone`);
    this.#wildMonsterEncountered = Math.random() < 0.9;
    if (this.#wildMonsterEncountered) {
      console.log(`[${floorTwo.name}:handlePlayerMovementUpdate] player encountered a wildMonster`);
      this.cameras.main.fadeOut(2000);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        // Aquí deberías iniciar la escena de batalla
         this.scene.start(SCENE_KEYS.BATTLE_SCENE_1);
        console.log('Starting Battle Scene...');
      });
    }
  }
}