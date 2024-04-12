import Phaser from '../lib/phaser.js';
import { WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
import { SCENE_KEYS } from './scene-keys.js';
import { Controls } from '../utils/controls.js';
import { DIRECTION } from '../common/direction.js';
import { SceneWithPlayer } from '../Patrones/Decorador/SceneWithPlayer.js';

export class FloorScene extends SceneWithPlayer {
  /** @type {Controls} */
  #controls;
  /** @type {Phaser.GameObjects.Image} */
  #portal;
  /** @type {string} */
  #floorName
  /** @type {string} */
  #floorBackground
  /** @type {number} */
  #camerawidth
  /** @type {number} */
  #cameraHeight

  constructor(sceneKey, floorName, floorBackground, cameraWidth, cameraHeight, playerConfig) {
    super(sceneKey, playerConfig);

    this.#floorName = floorName;
    this.#floorBackground = floorBackground;
    this.#camerawidth = cameraWidth;
    this.#cameraHeight = cameraHeight;
    playerConfig.scene = this;
  }

  create() {
    console.log(`[${this.#floorName}:preload] invoked`);
    this.cameras.main.setBounds(0, 0, this.#camerawidth, this.#cameraHeight);
    this.cameras.main.setZoom(0.7);

    this.add.image(0, 0, this.#floorBackground, 0).setOrigin(0);
    let portal = this.add.image(0, 0, WORLD_ASSET_KEYS.portal, 0);
    portal.setScale(0.1);
    portal.setPosition(1400, 500);

    super.create();

    // Store the portal in the class
    this.#portal = portal;

    this.cameras.main.startFollow(this.getPlayer().sprite);

    this.#controls = new Controls(this);

    // Agregar texto para explicar el juego
    const instructionText = this.add.text(
      this.getPlayer().sprite.x - 1,
      this.getPlayer().sprite.y - 500,
      '¡Bienvenido a piso ' + this.#floorName + ' te encontraras con nuevos monstruos. Recuerda que tienes que ir al siguiente portal para continuar con el siguiente nivel',
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
      this.getPlayer().moveCharacter(selectedDirection);
    }

    // Check the distance between the player and the portal
    const distanceToPortal = Phaser.Math.Distance.Between(
      this.getPlayer().sprite.x,
      this.getPlayer().sprite.y,
      this.#portal.x,
      this.#portal.y
    );

    // Check if the player is close to the portal
    if (distanceToPortal < this.getPlayer().sprite.displayWidth / 2 + this.#portal.displayWidth / 2) {
      // Start the new scene
      this.scene.start(SCENE_KEYS.FLOORTWO_BACKGROUND);
    }
  }
}