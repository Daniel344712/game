import {
  BATTLE_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from '../assets/asset-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { CharacterFactory } from './characterFactory.js';
import { DIRECTION } from '../common/direction.js';
import { BackGround } from '../battle/background.js';
import { HealthBar } from '../battle/ui/health-bar.js';
import { EnemyBattleMonster } from '../battle/characters/enemy-battle-monster.js';



export class BattleScene extends Phaser.Scene {
  /**@type {BattleMenu} */
  #battleMenu
  /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;
  /**@type {EnemyBattleMonster} */
  #activeEnemyMonster
  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }

  create() {
    console.log(`[${BattleScene.name}:create] invoked`);
    // create main background
    const background = new BackGround(this)
    background.showForest()
  

    

    // render out the player and enemy monsters PATRON FACTORY
    this.#activeEnemyMonster = new EnemyBattleMonster({
      scene: this,
      monsterDetails:{
        name: MONSTER_ASSET_KEYS.SKELETON,
        assetKey: MONSTER_ASSET_KEYS.SKELETON,
        assetFrame: 0,
        currentHp: 25,
        maxHp: 25,
        attackIds: [],
        baseAttack: 5
      }
    })
//    this.children.add(CharacterFactory.createSkeleton(this));
    this.children.add(CharacterFactory.createPlayer(this));


    // render out the player health bar
    const playerHealthBar = new HealthBar(this, 34,35);
 
    const playerMonsterName = this.add.text(
      30,
      20,
      MONSTER_ASSET_KEYS.WARRIOR,
      {
        color: '#7E3D3F',
        fontSize: '32px',
      }
    );
   

  
    this.add.container(556, 318, [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
        .setOrigin(0),
      playerMonsterName,
      playerHealthBar.container,
      
      this.add.text(playerMonsterName.width + 35, 23, 'L5', {
        color: '#ED474B',
        fontSize: '28px',
      }),
      this.add.text(30, 55, 'HP', {
        color: '#FF6505',
        fontSize: '24px',
        fontStyle: 'italic',
      }),
      this.add
        .text(443, 80, '25/25', {
          color: '#7E3D3F',
          fontSize: '16px',
        })
        .setOrigin(1, 0),
    ]);

    // render out the enemy health bar
  
   //const enemyHealthBar = new HealthBar(this, 34, 34);
  const enemyHealthBar = this.#activeEnemyMonster._healthBar
    const enemyMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.SKELETON, {
      color: '#7E3D3F',
      fontSize: '32px',
    });
    this.add.container(0, 0, [
      this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0).setScale(1, 0.8),
      enemyMonsterName,
      enemyHealthBar.container,
      this.add.text(enemyMonsterName.width + 35, 23, 'L5', {
        color: '#ED474B',
        fontSize: '28px',
      }),
      this.add.text(30, 55, 'HP', {
        color: '#FF6505',
        fontSize: '24px',
        fontStyle: 'italic',
      }),
    ]);

    // render out the main info and sub info panes

    this.#battleMenu = new BattleMenu(this)
    this.#battleMenu.showMainBattleMenu();
    this.#cursorKeys = this.input.keyboard.createCursorKeys();
    playerHealthBar.setMeterPercentageAnimated(0.5,{
      duration: 3000,
      callback: () => {
        console.log('animation completed')
      },
    })
    this.#activeEnemyMonster.takeDamage(24);
    console.log(this.#activeEnemyMonster.isFainted)
  }
  update() {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space)
    //console.log("Error 1: was space key pressed: " + wasSpaceKeyPressed);
    console.log(this.#cursorKeys.space.isDown);
    if (wasSpaceKeyPressed) {
      this.#battleMenu.handlePlayerInput('OK');
      //check if the player selected an attack, and update display text
      if(this.#battleMenu.selectedAttack === undefined){
        return;
      }
      console.log(`Player selected the following move: ${this.#battleMenu.selectedAttack}`)
      this.#battleMenu.hideMonsterAttackSubMenu();
      this.#battleMenu.updateInfoPaneMessagesAndWaitForInput(['You attacked the monster'], () => {
        this.#battleMenu.showMainBattleMenu();
      })
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



}
