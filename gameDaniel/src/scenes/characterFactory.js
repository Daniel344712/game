import { MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";

    export class CharacterFactory{
      static createSkeleton(scene) {
        return new Phaser.GameObjects.Image(scene, 768, 144, MONSTER_ASSET_KEYS.SKELETON, 0).setFlipX(true);
      }
     static createPlayer(scene) {
        return new Phaser.GameObjects.Image(scene, 168, 344, MONSTER_ASSET_KEYS.WARRIOR, 0).setFlipX(true);
      }
    }
   
  