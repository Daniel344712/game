
import Phaser from '../lib/phaser.js'
import { BATTLE_BACKGROUND_ASSET_KEYS } from '../assets/asset-keys.js';
export class BackGround{
      /**@type {Phaser.Scene} */
  #scene;
  /**@type {Phaser.GameObjects.Image} */
  #backgroundGameObject;
   /**
   * 
   * @param {Phaser.Scene} scene the Phaser 3 scene the battle menu will be added to
   */
    constructor(scene){
        this.#scene = scene

        this.#backgroundGameObject =   this.#scene.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0).setAlpha(0)
    }
    showForest(){
        this.#backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setAlpha(1)
    }
    showBattle_1(){
        this.#backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.BATTLE_SCENE_1).setAlpha(1)
    }
    showCave(){
        this.#backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.CAVE).setAlpha(1)
    }
    
}