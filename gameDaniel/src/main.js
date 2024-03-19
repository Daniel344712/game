import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { BattleScene } from './scenes/battle-scene.js';

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

    this.game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game.scene.add(SCENE_KEYS.BATTLE_SCENE, BattleScene);
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
