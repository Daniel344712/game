class SingletonGame {
    /** @type {Phaser.Game} */
    #game;

    constructor() {
        this.#game = new Phaser.Game({
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
    }

    /** @type {Phaser.Game} */
    get game() {
        return this.#game;
      }
  
}

var GameInstance = new SingletonGame();

export { GameInstance };
