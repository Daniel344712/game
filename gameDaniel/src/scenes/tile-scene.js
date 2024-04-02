import { TILE_ASSET_KEYS, UI_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from "./scene-keys.js";

/** @type {Phaser.Types.GameObjects.Text.TextStyle}*/
export const MENU_TEXT_STYLE = {
    fontFamily: 'Arial',
    color: '#4D4A49',
    fontSize: '30px',
}
const PLAYER_INPUT_CURSOR_POSITION = Object.freeze({ 
    x: 150, 
     })
export class TileScene extends Phaser.Scene {
    /** @type {Phaser.GameObjects.Image} */
    #mainMenuCursorPhaserImageGameObject
    constructor() {
      super({
        key: SCENE_KEYS.TILE_SCENE,
      });
    }

    create(){
        console.log(`[${TileScene.name}:create] invoked`);
  
 

       this.add.image(0,0, TILE_ASSET_KEYS.BACKGROUND).setOrigin(0).setScale(0.58)
       this.add.image(this.scale.width / 2,150, TILE_ASSET_KEYS.PANEL).setScale(0.25, 0.25).setAlpha(0.5)
       this.add.image(this.scale.width / 2,150, TILE_ASSET_KEYS.TITLE).setScale(0.55).setAlpha(0.55)
       const menuBgWidth = 500;
       const menuBg = this.add.image(125, 0, UI_ASSET_KEYS.MENU_BACKGROUND).setOrigin(0).setScale(2.4,2)
       const menuBgContainer = this.add.container(0,0, [menuBg])
       const newGameText = this.add.text(menuBgWidth / 2, 40, 'New game', MENU_TEXT_STYLE).setOrigin(0.5)
       const exitText = this.add.text(menuBgWidth / 2, 90, 'Exit', MENU_TEXT_STYLE).setOrigin(0.5)

       const menuContainer = this.add.container(0,0, [menuBgContainer, newGameText, exitText])
       menuContainer.setPosition(this.scale.width / 2- menuBgWidth / 2, 300)

       this.#mainMenuCursorPhaserImageGameObject = this.add.image(PLAYER_INPUT_CURSOR_POSITION.x, 41, UI_ASSET_KEYS.CURSOR).setOrigin(0.5).setScale(2.5)
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
}}