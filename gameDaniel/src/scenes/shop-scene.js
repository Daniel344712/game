import Phaser from '../lib/phaser.js';
import { UI_ASSET_KEYS, WORLD_ASSET_KEYS } from '../assets/asset-keys.js';
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
/** @type {Phaser.Types.GameObjects.Text.TextStyle}*/
export const MENU_TEXT_STYLE = {
    fontFamily: 'Arial',
    color: '#4D4A49',
    fontSize: '30px',
}
const PLAYER_INPUT_CURSOR_POSITION = Object.freeze({
    x: 150,
})

/** @typedef {keyof typeof MAIN_MENU_OPTIONS}  MainMenuOptions*/
/** @enum {MainMenuOptions} */
const MAIN_MENU_OPTIONS = Object.freeze({
    POTION: 'POTION',
    EXIT: 'EXIT'

})

export class SHOP_SCENE extends Phaser.Scene {
    /** @type {Player} */
    #player;
    /** @type {Phaser.GameObjects.Image} */
    #portal;
    /** @type {Phaser.GameObjects.Image} */
    #mainMenuCursorPhaserImageGameObject
    /** @type {Controls} */
    #controls
    /** @type {MainMenuOptions} */
    #selectedMenuOption

    constructor() {
        super({
            key: SCENE_KEYS.SHOP_SCENE,
        });
    }

    create() {
        this.#selectedMenuOption = MAIN_MENU_OPTIONS.POTION;
        console.log(PLAYER_POSITION)
        console.log(`[${SHOP_SCENE.name}:preload] invoked`);
        this.cameras.main.setBounds(0, 0, 1280, 2176);
        this.cameras.main.setZoom(0.8);
        this.cameras.main.setPosition(0, 0)

        this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0)
        this.add.image(0, 0, WORLD_ASSET_KEYS.SHOP_SCENE, 0).setOrigin(-0.4, -0.2);
        this.add.image(0, 0, WORLD_ASSET_KEYS.ICON_SHOP, 0).setOrigin(-2.6, -1.5).setScale(0.5, 0.5)

        const menuBgWidth = 500;

        const menuBgContainer = this.add.container(0, 0)
        const newGameText = this.add.text(menuBgWidth / 2, 40, 'Potion Health', MENU_TEXT_STYLE).setOrigin(-0.1, 3)
        const exitText = this.add.text(menuBgWidth / 2, 90, 'Exit', MENU_TEXT_STYLE).setOrigin(-1.5, 3)

        const menuContainer = this.add.container(0, 0, [menuBgContainer, newGameText, exitText])
        menuContainer.setPosition(this.scale.width / 2 - menuBgWidth / 2, 300)

        this.#mainMenuCursorPhaserImageGameObject = this.add.image(PLAYER_INPUT_CURSOR_POSITION.x, -40, UI_ASSET_KEYS.CURSOR).setOrigin(-4, 0.5).setScale(2.5)
        menuBgContainer.add(this.#mainMenuCursorPhaserImageGameObject)
        this.tweens.add({
            delay: 0,
            duration: 500,
            repeat: -1,
            x: {
                from: PLAYER_INPUT_CURSOR_POSITION.x,
                start: PLAYER_INPUT_CURSOR_POSITION.x,
                to: PLAYER_INPUT_CURSOR_POSITION.x + 3,
            },
            targets: this.#mainMenuCursorPhaserImageGameObject,
        })
       
        this.#controls = new Controls(this)
    }
 
    update() {
        if (this.#controls.isInputLocked) {
            return
        }
        const wasSpaceKeyPressed = this.#controls.wasSpaceKeyPressed()
        if (wasSpaceKeyPressed) {
            if (this.#selectedMenuOption === MAIN_MENU_OPTIONS.EXIT) {
                this.scene.start(SCENE_KEYS.WORLD_SCENE)
                this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.#controls.lockInput = true;
            }
            return
        }
        const selectedDirection = this.#controls.getDirectionKeyPressedDown()
        if (selectedDirection !== DIRECTION.NONE) {
            this.#moveMenuSelectCursor(selectedDirection)
        }
    }
    /**
     *  @param {import('../common/direction.js').Direction} direction
      @returns {void}
    */
    #moveMenuSelectCursor(direction) {
        switch (direction) {
            case DIRECTION.UP:
                this.#selectedMenuOption = MAIN_MENU_OPTIONS.POTION
                this.#mainMenuCursorPhaserImageGameObject.y = -40
                break;
            case DIRECTION.DOWN:
                this.#selectedMenuOption = MAIN_MENU_OPTIONS.EXIT
                this.#mainMenuCursorPhaserImageGameObject.y = 20
                break;
            default:


        }
    }
}