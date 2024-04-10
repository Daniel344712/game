import {
  BATTLE_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
  UI_ASSET_KEYS,
} from '../assets/asset-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { DIRECTION } from '../common/direction.js';
import { BackGround } from '../battle/background.js';
import { EnemyBattleMonster } from '../battle/characters/enemy-battle-monster.js';
import { PlayerBattleMonster } from '../battle/characters/player-battle-monster.js';
import { SHOP_SCENE } from './shop-scene.js';
import { Director } from '../Patrones/Builder/Director.js';



export class BattleScene extends Phaser.Scene {
  /**@type {BattleMenu} */
  #battleMenu
  /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
  /**@type {EnemyBattleMonster} */
  #activeEnemyMonster
  /**@type {PlayerBattleMonster} */
  #activePlayerMonster;
  /**@type {number} */
  #activePlayerAttackIndex
  /**@type {SHOP_SCENE} */
  #numberOfPotions
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }
  init() {
    this.#activePlayerAttackIndex = -1;

  }
  create() {

    console.log(`[${BattleScene.name}:create] invoked`);
    // create main background
    var background = Math.floor(Math.random() * 10) % 3;
    switch (background) {
      case 0:
        const background = new BackGround(this)
        background.showForest()
        break
      case 1:
        const background1 = new BackGround(this)
        background1.showBattle_1()
        break
      case 2:
        const background2 = new BackGround(this)
        background2.showCave()
    }
    const exit = this.add.image(0, 0, UI_ASSET_KEYS.EXIT, 0).setOrigin(-30, 0);
    this.exitContainer = this.add.container(10, 10);
    this.exitContainer.add(exit);
    exit.setInteractive();
    exit.on('pointerup', () => {
      this.scene.start(SCENE_KEYS.TILE_SCENE);
    });


    var monster = Math.floor(Math.random() * 10) % 4;

    switch (monster) {
      case 0:
        this.#activeEnemyMonster = new EnemyBattleMonster({
          scene: this,
          monsterDetails: new Director().CreateConfiguration(
            MONSTER_ASSET_KEYS.SKELETON,
            MONSTER_ASSET_KEYS.SKELETON,
            0,
            25,
            25,
            [1],
            5,
            5
          )
        })
        break;
      case 1:
        this.#activeEnemyMonster = new EnemyBattleMonster({
          scene: this,
          monsterDetails: new Director().CreateConfiguration(
            MONSTER_ASSET_KEYS.GOBLIN,
            MONSTER_ASSET_KEYS.GOBLIN,
            0,
            25,
            25,
            [1],
            5,
            5,
          )
        })

        break;
      case 2:
        this.#activeEnemyMonster = new EnemyBattleMonster({
          scene: this,
          monsterDetails: new Director().CreateConfiguration(
            MONSTER_ASSET_KEYS.DEMON,
            MONSTER_ASSET_KEYS.DEMON,
            0,
            25,
            25,
            [1],
            5,
            5,
          )
        })

        break;
      case 3:
        this.#activeEnemyMonster = new EnemyBattleMonster({
          scene: this,
          monsterDetails: new Director().CreateConfiguration(
            MONSTER_ASSET_KEYS.WORM,
            MONSTER_ASSET_KEYS.WORM,
            0,
            25,
            25,
            [1],
            5,
            5,
          )
        })

        break;
      case 4:
        this.#activeEnemyMonster = new EnemyBattleMonster({
          scene: this,
          monsterDetails: new Director().CreateConfiguration(
            MONSTER_ASSET_KEYS.EvilWizard,
            MONSTER_ASSET_KEYS.EvilWizard,
            0,
            25,
            25,
            [1],
            5,
            5,
          )
        })

        break;
    }

    this.#activePlayerMonster = new PlayerBattleMonster(
      {
        scene: this,
        monsterDetails: new Director().CreateConfiguration(
          MONSTER_ASSET_KEYS.WARRIOR,
          MONSTER_ASSET_KEYS.WARRIOR,
          0,
          25,
          25,
          [2],
          5,
          5,
        )
      });

    // render out the main info and sub info panes

    this.#battleMenu = new BattleMenu(this, this.#activePlayerMonster)
    this.#battleMenu.showMainBattleMenu();
    this.#cursorKeys = this.input.keyboard.createCursorKeys();


    console.log(this.#activeEnemyMonster.isFainted)
  }
  update() {



    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space)
    //console.log("Error 1: was space key pressed: " + wasSpaceKeyPressed);
    console.log(this.#cursorKeys.space.isDown);
    if (wasSpaceKeyPressed) {
      this.#battleMenu.handlePlayerInput('OK');
      if (this.#battleMenu.selectedAttack === undefined) {
        return;
      }
      //check if the player selected an attack, and update display text

      this.#activePlayerAttackIndex = this.#battleMenu.selectedAttack
      if (!this.#activePlayerMonster.attacks[this.#activePlayerAttackIndex]) {
        return;
      }
      console.log(`Player selected the following move: ${this.#battleMenu.selectedAttack}`)

      this.#battleMenu.hideMonsterAttackSubMenu();
      this.#handleBattleSequence()
    }

    if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)) {
      this.#battleMenu.handlePlayerInput('CANCEL');
      return;
    }

    /**@type {import('../common/direction.js').Direction} */
    let selectedDirection = DIRECTION.NONE;
    if (this.#cursorKeys.left.isDown) {
      selectedDirection = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right.isDown) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (this.#cursorKeys.up.isDown) {
      selectedDirection = DIRECTION.UP;
    } else if (this.#cursorKeys.down.isDown) {
      selectedDirection = DIRECTION.DOWN;
    }
    if (selectedDirection !== DIRECTION.NONE) {
      this.#battleMenu.handlePlayerInput(selectedDirection);
    }
  }
  #handleBattleSequence() {
    // general battle flow
    // show attack used, brief pause
    // then play attack animation, brief pause
    // then play damage animation, brief pause
    // then play health bar animation, brief pause
    // then repeat the steps above for other monster

    this.#playerAttack();
  }
  #playerAttack() {
    this.#battleMenu.updateInfoPaneMessagesAndWaitForInput([`${this.#activePlayerMonster.name} used ${this.#activePlayerMonster.attacks[this.#activePlayerAttackIndex].name}`], () => {
      this.time.delayedCall(500, () => {
        console.log("Dando 20 de damage");
        this.#activeEnemyMonster.takeDamage(20, () => {
          if (this.#activeEnemyMonster.isFainted) {
            console.log("You win");

            this.scene.stop();
            this.scene.resume(SCENE_KEYS.FLOORONE_BACKGROUND);
          } else {
            this.#enemyAttack();
          }

          console.log("Error 2", this.#activePlayerAttackIndex);
          //  if(this.#activePlayerMonster.isFainted){
          //    console.log("You lose");
          //    this.scene.start(SCENE_KEYS.FLOORTWO_BACKGROUND);
          //  }
        });
      });
    });
  }


  #enemyAttack() {
    this.#battleMenu.updateInfoPaneMessagesAndWaitForInput([`for ${this.#activeEnemyMonster.name} used ${this.#activeEnemyMonster.attacks[0].name}`], () => {
      // if (this.#activeEnemyMonster.isFainted) {
      //   console.log("You win");
      //   this.scene.start(SCENE_KEYS.FLOORONE_BACKGROUND);
      // }
      this.time.delayedCall(500, () => {
        this.#activePlayerMonster.takeDamage(20, () => {
          this.#battleMenu.showMainBattleMenu();


        });
      });
    });
  }

}