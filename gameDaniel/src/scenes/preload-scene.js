import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  CHARACTER_ASSET_KEYS,
  DATA_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
  TILE_ASSET_KEYS,
  UI_ASSET_KEYS,
  WORLD_ASSET_KEYS,
} from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { DataUtils } from '../utils/data-utils.js';
import { Player } from '../world/characters/player.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  preload() {
    console.log(`[${PreloadScene.name}:preload] invoked`);

    const monsterTamerAssetPath = 'assets/images/monster-tamer';
    const kenneysAssetPath = 'assets/images/kenneys-assets';
    const UIPATH = 'assets/images/ui'
    const axulArtAssetPath = 'assets/images/axulart'
    const pbGamesAssetPath = 'assets/images/parabellum-games'

    // battle backgrounds
    this.load.image(
      BATTLE_BACKGROUND_ASSET_KEYS.FOREST,
      `${monsterTamerAssetPath}/battle-backgrounds/awesomeCavePixelArt.png`
    );
    this.load.image(
      BATTLE_BACKGROUND_ASSET_KEYS.BATTLE_SCENE_1,
      `${monsterTamerAssetPath}/battle-backgrounds/forest-background.png`
    );
    this.load.image(
      BATTLE_BACKGROUND_ASSET_KEYS.CAVE,
      `${monsterTamerAssetPath}/battle-backgrounds/cave.png`
    );

    // battle assets
    this.load.image(
      BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
      `${kenneysAssetPath}/ui-space-expansion/custom-ui.png`
    );

    // health bar assets
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_right.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.MIDDLE,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_mid.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_green_left.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_shadow_right.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.MIDDLE_SHADOW,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_shadow_mid.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW,
      `${kenneysAssetPath}/ui-space-expansion/barHorizontal_shadow_left.png`
    );
    // monster assets
    this.load.image(
      MONSTER_ASSET_KEYS.SKELETON,
      `${monsterTamerAssetPath}/monsters/skeleton.png`
    );
    this.load.image(
      MONSTER_ASSET_KEYS.WARRIOR,
      `${monsterTamerAssetPath}/monsters/warrior.png`
    );
    this.load.image(
      MONSTER_ASSET_KEYS.DEMON,
      `${monsterTamerAssetPath}/monsters/demon.png`
    );
    this.load.image(
      MONSTER_ASSET_KEYS.WORM,
      `${monsterTamerAssetPath}/monsters/worm.png`
    );
  
  
      this.load.image(
        MONSTER_ASSET_KEYS.GOBLIN,
        `${monsterTamerAssetPath}/monsters/Goblin.gif`);
    //ui assets
    this.load.image(
      UI_ASSET_KEYS.CURSOR,
      `${monsterTamerAssetPath}/ui/cursor.png`
    )
    this.load.image(
      UI_ASSET_KEYS.EXIT,
      `${monsterTamerAssetPath}/ui/exitButton.png`
    )
    this.load.image(
      WORLD_ASSET_KEYS.DOLLAR_SIGN,
      `${monsterTamerAssetPath}/ui/single_dollar.png`
    )
    this.load.image(
      UI_ASSET_KEYS.MENU_BACKGROUND,
      `${kenneysAssetPath}/ui-space-expansion/glassPanel.png`
    )
    //load json data
    this.load.json(DATA_ASSET_KEYS.ATTACKS, 'assets/data/attacks.json')
    this.load.json(DATA_ASSET_KEYS.ANIMATIONS, 'assets/data/animations.json')
    //load world assets
    this.load.image(WORLD_ASSET_KEYS.WORLD_BACKGROUND, `${monsterTamerAssetPath}/map/level_background.png`)
    this.load.image(WORLD_ASSET_KEYS.FLOORONE_BACKGROUND, `${monsterTamerAssetPath}/map/Mockup.png`)
    this.load.image(WORLD_ASSET_KEYS.FLOORTWO_BACKGROUND, `${monsterTamerAssetPath}/map/floorTwo.png`)
    this.load.tilemapTiledJSON(WORLD_ASSET_KEYS.WORLD_MAIN_LEVEL, `assets/data/level.json`)
    this.load.image(WORLD_ASSET_KEYS.WORLD_COLLISION, `${monsterTamerAssetPath}/map/collision.png`)
    this.load.image(WORLD_ASSET_KEYS.portal, `${monsterTamerAssetPath}/map/portal.png`)
    this.load.image(WORLD_ASSET_KEYS.ICON_SHOP, `${monsterTamerAssetPath}/map/icon.png`)
    this.load.image(WORLD_ASSET_KEYS.SHOP_SCENE, `${monsterTamerAssetPath}/map/shop.png`)
    this.load.image(WORLD_ASSET_KEYS.WORLD_FOREGROUND, `${monsterTamerAssetPath}/map/level_foreground.png`)
        this.load.image(WORLD_ASSET_KEYS.WORLD_ENCOUNTER_ZONE, `${monsterTamerAssetPath}/map/encounter.png`)
    //load character images
    this.load.spritesheet(CHARACTER_ASSET_KEYS.PLAYER, `${axulArtAssetPath}/character/custom.png`, {
      frameWidth: 64,
      frameHeight: 88,
    })
    this.load.spritesheet(MONSTER_ASSET_KEYS.EvilWizard, `${monsterTamerAssetPath}/monsters/EvilWizard.png`, {
      frameWidth: 150,
      frameHeight: 150,
    })
    // UI COMPONENTS FOR TITLE
    this.load.image(TILE_ASSET_KEYS.BACKGROUND, `${monsterTamerAssetPath}/ui/title/background.png`)
    this.load.image(TILE_ASSET_KEYS.PANEL, `${monsterTamerAssetPath}/ui/title/title_background.png`)
    this.load.image(TILE_ASSET_KEYS.TITLE, `${monsterTamerAssetPath}/ui/title/title_text.png`)

  }




  create() {
    console.log(`[${PreloadScene.name}:create] invoked`);
    this.#createAnimations();
    this.scene.start(SCENE_KEYS.SHOP_SCENE);
    
  }

  #createAnimations() {
    const animations = DataUtils.getAnimations(this)
    animations.forEach((animation) => {
      const frames = animation.frames ? this.anims.generateFrameNumbers(animation.assetKey, { frames: animation.frames })
        : this.anims.generateFrameNames(animation.assetKey)
      this.anims.create({
        key: animation.key,
        frames: frames,
        frameRate: animation.frameRate,
        repeat: animation.repeat,
        delay: animation.delay,
        yoyo: animation.yoyo,
      })
    })
  }
}
