import { MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";

    export class CharacterFactory{
      static createSkeleton(config, position) {
        return new Phaser.GameObjects.Image(config.scene, position.x, position.y, config.monsterDetails.assetKey, config.monsterDetails.assetFrame || 0).setFlipX(true)
      }
     static createPlayer(scene) {
        return new Phaser.GameObjects.Image(scene, 168, 344, MONSTER_ASSET_KEYS.WARRIOR, 0);
      }
    }
   
  