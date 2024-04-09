import { MONSTER_ASSET_KEYS } from "../../assets/asset-keys.js";

export class CharacterFactory {
  /**
   * @param {import('../../types/typedef.js').BattleMonsterConfig} config
   * @param {import('../../types/typedef.js').Coordinate} position
   */
  static createMonster(config, position) {
    return new Phaser.GameObjects.Image(
      config.scene, 
      position.x, 
      position.y, 
      config.monsterDetails.assetInformation.assetKey, 
      config.monsterDetails.assetInformation.assetFrame || 0).setFlipX(true);
  }

  
}

