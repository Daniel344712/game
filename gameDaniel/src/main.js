import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { BattleScene } from './scenes/battle-scene.js';
import { WorldScene } from './scenes/world-scene.js';
import { FloorScene } from './scenes/FloorScene.js';
import { TileScene } from './scenes/tile-scene.js';
import { SHOP_SCENE } from './scenes/shop-scene.js';
import { WORLD_ASSET_KEYS } from './assets/asset-keys.js';
import { TILE_SIZE } from './world/characters/config.js';
import { DIRECTION } from './common/direction.js';
import { PlayerSceneWithMonsters } from './Patrones/Decorador/PlayerSceneWithMonsters.js';


// Aquí puedes utilizar gameInstance como lo necesites en tu aplicación


class GameSingleton {
  constructor() {
    this.instance = null;
    this.game = new Phaser.Game({
      type: Phaser.CANVAS,
      pixelArt: false,
      scale: {
        parent: 'game-container',
        width: 1024,
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#000000',
    });

    var floorOnePlayerConfig = {
      position: {
        x: 2 * TILE_SIZE,
        y: 9.2 * TILE_SIZE,
      },
      direction: DIRECTION.DOWN
    }

    var floorTwoPlayerConfig = {
      position: {
        x: 2 * TILE_SIZE,
        y: 9.2 * TILE_SIZE,
      },
      direction: DIRECTION.DOWN
    }
    var floorTreePlayerConfig = {
      position: {
        x: 2 * TILE_SIZE,
        y: 9.2 * TILE_SIZE,
      },
      direction: DIRECTION.DOWN
    }
    
    var floorOneScene = new FloorScene(SCENE_KEYS.FLOORONE_BACKGROUND, "uno", WORLD_ASSET_KEYS.FLOORONE_BACKGROUND, 1000, 1000, floorOnePlayerConfig);
    var floorTwoScene = new FloorScene(SCENE_KEYS.FLOORTWO_BACKGROUND, "dos", WORLD_ASSET_KEYS.FLOORTWO_BACKGROUND, 1100, 900, floorTwoPlayerConfig);
    var floorTreeScene = new FloorScene(SCENE_KEYS.MAGIC, "tres", WORLD_ASSET_KEYS.MAGIC, 1100, 900, floorTreePlayerConfig);

    this.game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
    this.game.scene.add(SCENE_KEYS.FLOORONE_BACKGROUND, new PlayerSceneWithMonsters(floorOneScene, SCENE_KEYS.BATTLE_SCENE, floorOnePlayerConfig).getScene());
    this.game.scene.add(SCENE_KEYS.FLOORTWO_BACKGROUND, new PlayerSceneWithMonsters(floorTwoScene, SCENE_KEYS.BATTLE_SCENE, floorTwoPlayerConfig).getScene());
    this.game.scene.add(SCENE_KEYS.MAGIC, new PlayerSceneWithMonsters(floorTreeScene, SCENE_KEYS.BATTLE_SCENE, floorTreePlayerConfig).getScene());
    this.game.scene.add(SCENE_KEYS.BATTLE_SCENE, BattleScene);
    this.game.scene.add(SCENE_KEYS.TILE_SCENE, TileScene);
    this.game.scene.add(SCENE_KEYS.SHOP_SCENE, SHOP_SCENE);
    //this.game.scene.add(SCENE_KEYS.BATTLE_SCENE_1, BATTLE_SCENE_1);
    this.game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
    
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new GameSingleton();
    }
    return this.instance;
  }
}

GameSingleton.instance = null;

export const gameInstance = GameSingleton.getInstance();
