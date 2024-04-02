import { MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";

export class CharacterFactory {
  static createMonster(config, position) {
    return new Phaser.GameObjects.Image(config.scene, position.x, position.y, config.monsterDetails.assetKey, config.monsterDetails.assetFrame || 0).setFlipX(true);
  }

  
}

