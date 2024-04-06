import Phaser from '../../../lib/phaser.js'
import { MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from '../../../assets/asset-keys.js';
import { DIRECTION } from '../../../common/direction.js';
import { exhaustiveGuard } from '../../../utils/guard.js';
import { ACTIVE_BATTLE_MENU, ATTACK_MOVE_OPTIONS, BATTLE_MENU_OPTIONS } from '../../battle-menu-options.js';
import { BATTLE_UI_TEXT_STYLE } from '../../battle-menu-config.js';
import { BattleMonster } from '../../characters/battle-character.js';



const BATTLE_MENU_CURSOR_POS = Object.freeze({
  x: 42,
  y: 38,
});
const ATTACK_MOVE_CURSOR_POS = Object.freeze({
  x: 42,
  y: 38,
})
export class BattleMenu {
  /**@type {Phaser.Scene} */
  #scene;
  /**@type {Phaser.GameObjects.Container} */
  #mainBattleMenuPhaserContainerGameObject;
  /**@type {Phaser.GameObjects.Container} */
  #moveSelectionSubBattleMenuPhaserContainerGameObject;
  /**@type {Phaser.GameObjects.Text} */
  #battleTextGameObjectLine1;
  /**@type {Phaser.GameObjects.Text} */
  #battleTextGameObjectLine2;
  /**@type {Phaser.GameObjects.Image} */
  #mainBattleMenuCursorPhaserImageGameObject;
  /**@type {Phaser.GameObjects.Image} */
  #attackBattleMenuPhaserImageGameObject;
  /**@type {import('../../battle-menu-options.js').BattleMenuOptions} */
  #selectedBattleMenuOption;
  /**@type {import('../../battle-menu-options.js').AttackMoveOptions} */
  #selectedAttackMenuOption;
 /** @type {import('../../battle-menu-options.js').ActiveBattleMenu} */
  #ActiveBattleMenu;
  /**@type {string[]} */
  #queuedInfoPanelMessages;
  /**@type {() => void} */
  #queuedInfoPanelCallback;
  /**@type {boolean} */
  #waitingForPlayerInput;
  /**@types {number | undefined} */
  #selectedMoveIndex;
   /**@type {BattleMonster} */
  #activePlayerMonster
  /**
   * 
   * @param {Phaser.Scene} scene the Phaser 3 scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster
   */
  constructor(scene, activePlayerMonster) {
    this.#scene = scene;
    this.#activePlayerMonster = activePlayerMonster;
    this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
    this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
    this.#queuedInfoPanelCallback = undefined
    this.#queuedInfoPanelMessages = [];
    this.#waitingForPlayerInput = false
    this.#selectedMoveIndex = undefined;
    this.#createMainInfoPane();
    this.#createMainBattleMenu();
    this.#createMonsterAttackSubMenu();
  }
  /**@types {number | undefined} */
  get selectedAttack() {
    if (this.#ActiveBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
      console.log("ERROR 2",this.#selectedMoveIndex)
      return this.#selectedMoveIndex
    
    }
    return undefined;
  }
  showMainBattleMenu() {

    this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#battleTextGameObjectLine1.setText('what should');
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.#battleTextGameObjectLine1.setAlpha(1);
    this.#battleTextGameObjectLine2.setAlpha(1);
    this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
    this.#selectedMoveIndex = undefined;
  }

  hideMainBattleMenu() {
   
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#battleTextGameObjectLine1.setAlpha(0);
    this.#battleTextGameObjectLine2.setAlpha(0);
  }

  showMonsterAttackSubMenu() {
    this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
  }

  hideMonsterAttackSubMenu() {
    this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
  }
  /**@param {import('../../../common/direction.js').Direction|'OK'|'CANCEL'} input */
  handlePlayerInput(input) {
    console.log("Error 1: Handle player input called con parametro: " + input);
    console.log("Error 1: waiting for player input: " + this.#waitingForPlayerInput);
    if (this.#waitingForPlayerInput && (input === 'CANCEL' || input === 'OK')) {
      this.#updateInfoPaneWithMessage()
      return;
    }
    console.log(input)
    if (input === 'CANCEL') {
      this.#switchToMainBattleMenu();
      return;
    }
    if (input === 'OK') {
      console.log("Error 1: ActiveBattleMenu: " + this.#ActiveBattleMenu);
      if (this.#ActiveBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
        this.#handlePlayerChooseMainBattleOption();
        return;
      }
      console.log("Error 3: ActiveBattleMenu: " + this.#ActiveBattleMenu);
      if (this.#ActiveBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
        this.#handlePlayerChooseAttack();
        return
      }
      return;
    }
    this.#updateSelectedBattleMenuOptionFromInput(input);
    this.#updateSelectedMoveMenuOptionFromInput(input);
    this.#moveMainBattleMenuCursor();
    this.#moveMoveSelectBattleMenuCursor();
  }
  /**
   * 
   * @param {string[]} messages 
   * @param {() => void} [callback] 
   */
  updateInfoPaneMessagesAndWaitForInput(messages, callback) {
    console.log("updateInfoPaneMessagesAndWaitForInput " + messages.toString());
    this.#queuedInfoPanelMessages = messages;
    this.#queuedInfoPanelCallback = callback;
    this.#updateInfoPaneWithMessage();
  }

  #updateInfoPaneWithMessage() {
    console.log("updateInfoPaneWithMessage called");
    this.#waitingForPlayerInput = false;
    this.#battleTextGameObjectLine1.setText('').setAlpha(1);
    //check if all messages habe been displayed from the queue and call the callback
    if (this.#queuedInfoPanelMessages.length === 0) {
      if (this.#queuedInfoPanelCallback) {
        this.#queuedInfoPanelCallback();
        this.#queuedInfoPanelCallback = undefined;

      }
      return
    }
    // get first message from queue and animate message
    const messageToDisplay = this.#queuedInfoPanelMessages.shift();
    console.log("displaying message " + messageToDisplay);
    this.#battleTextGameObjectLine1.setText(messageToDisplay);
    this.#waitingForPlayerInput = true;
  }
  #createMainBattleMenu() {
    this.#battleTextGameObjectLine1 = this.#scene.add.text(20, 468, 'what should', BATTLE_UI_TEXT_STYLE);
      
    this.#battleTextGameObjectLine2 = this.#scene.add.text(
      20,
      512,
      `${this.#activePlayerMonster.name} do next?`,
      BATTLE_UI_TEXT_STYLE
    );

    this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add
      .image(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0)
      .setOrigin(0.5)
      .setScale(2.5);

    this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
      this.#createMainInfoSubPane(),
      this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, BATTLE_UI_TEXT_STYLE),
      this.#mainBattleMenuCursorPhaserImageGameObject,
    ]);
    
    this.hideMainBattleMenu();
  }


  #createMonsterAttackSubMenu() {
    this.#attackBattleMenuPhaserImageGameObject = this.#scene.add
      .image(ATTACK_MOVE_CURSOR_POS.x, ATTACK_MOVE_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0)
      .setOrigin(0.5)
      .setScale(2.5);

      /** @type {string[]} */
      const attacksNames = [];
      for (let i =0; i <4; i+=1){
        attacksNames.push(this.#activePlayerMonster.attacks[i]?.name || '-')
      }

    this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
      this.#scene.add.text(55, 22, attacksNames[0], BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(240, 22, attacksNames[1], BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(55, 70, attacksNames[2], BATTLE_UI_TEXT_STYLE),
      this.#scene.add.text(240, 70, attacksNames[3], BATTLE_UI_TEXT_STYLE),
      this.#attackBattleMenuPhaserImageGameObject,
    ]);
    this.hideMonsterAttackSubMenu();
  }

  #createMainInfoPane() {
    const padding = 4;
    const rectHeight = 124;

    this.#scene.add
      .rectangle(
        padding,
        this.#scene.scale.height - rectHeight - padding,
        this.#scene.scale.width - padding * 2,
        rectHeight,
        0xede4f3,
        1
      )
      .setOrigin(0)
      .setStrokeStyle(8, 0xe4434a, 1);
  }

  #createMainInfoSubPane() {
    const rectWidth = 500;
    const rectHeight = 124;

    return this.#scene.add
      .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }
  /**@param {import('../../../common/direction.js').Direction} direction */
  #updateSelectedBattleMenuOptionFromInput(direction) {
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH
          return;
        case DIRECTION.DOWN:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM
          return;
        case DIRECTION.LEFT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }

    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
          return;
        case DIRECTION.DOWN:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
          return;
        case DIRECTION.UP:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
          return;
        case DIRECTION.LEFT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
          return;
        case DIRECTION.UP:
          this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
  }
  #moveMainBattleMenuCursor() {
    switch (this.#selectedBattleMenuOption) {
      case BATTLE_MENU_OPTIONS.FIGHT:
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y)
        return;
      case BATTLE_MENU_OPTIONS.SWITCH:
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 38)
        return;
      case BATTLE_MENU_OPTIONS.ITEM:
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(42, 86)
        return;
      case BATTLE_MENU_OPTIONS.FLEE:
        this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 86)
        return;
      default:
        exhaustiveGuard(this.#selectedBattleMenuOption)
    }
  }
  /**@param {import('../../../common/direction.js').Direction} direction */
  #updateSelectedMoveMenuOptionFromInput(direction) {
    if (this.#ActiveBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
      return;
    }
    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_1) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
          return;
        case DIRECTION.DOWN:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
          return;
        case DIRECTION.LEFT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_2) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
          return;
        case DIRECTION.DOWN:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.UP:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_3) {
      switch (direction) {
        case DIRECTION.RIGHT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_4;
          return;
        case DIRECTION.UP:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_1;
          return;
        case DIRECTION.LEFT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    if (this.#selectedAttackMenuOption === ATTACK_MOVE_OPTIONS.MOVE_4) {
      switch (direction) {
        case DIRECTION.LEFT:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_3;
          return;
        case DIRECTION.UP:
          this.#selectedAttackMenuOption = ATTACK_MOVE_OPTIONS.MOVE_2;
          return;
        case DIRECTION.RIGHT:
        case DIRECTION.DOWN:
        case DIRECTION.NONE:
          return;
        default:
          exhaustiveGuard(direction)
      }
      return;
    }
    exhaustiveGuard(this.#selectedAttackMenuOption)
  }


  #moveMoveSelectBattleMenuCursor() {
    switch (this.#selectedAttackMenuOption) {
      case ATTACK_MOVE_OPTIONS.MOVE_1:
        this.#attackBattleMenuPhaserImageGameObject.setPosition(
          ATTACK_MOVE_CURSOR_POS.x,
          ATTACK_MOVE_CURSOR_POS.y)
        return
      case ATTACK_MOVE_OPTIONS.MOVE_2:
        this.#attackBattleMenuPhaserImageGameObject.setPosition(228, ATTACK_MOVE_CURSOR_POS.y)
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_3:
        this.#attackBattleMenuPhaserImageGameObject.setPosition(ATTACK_MOVE_CURSOR_POS.x, 86)
        return;
      case ATTACK_MOVE_OPTIONS.MOVE_4:
        this.#attackBattleMenuPhaserImageGameObject.setPosition(228, 38)
        return;
      default:
        exhaustiveGuard(this.#selectedAttackMenuOption)
    }
  }
  #switchToMainBattleMenu() {
    this.hideMonsterAttackSubMenu();
    this.showMainBattleMenu();
  }
  #handlePlayerChooseMainBattleOption() {
    this.hideMainBattleMenu();
    
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
     this.showMonsterAttackSubMenu();
      return
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH) {
      this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_SWITCH
      this.updateInfoPaneMessagesAndWaitForInput(['You have no monster on your party...'], () => {
        this.#switchToMainBattleMenu();
      })
    }
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
      this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_ITEM;
      
      if(this.#activePlayerMonster.currentHealth === this.#activePlayerMonster.maxHealth){
        this.updateInfoPaneMessagesAndWaitForInput(['Your monster is already at full health...'], () => {
          this.#switchToMainBattleMenu();
        });
      } else if(currentPotions > 0) {
        var currentPotions = parseInt(localStorage.getItem('potions')) 
        this.#activePlayerMonster.takeHealth(20, () => {
          localStorage.setItem('potions', (currentPotions - 1).toString());
          this.updateInfoPaneMessagesAndWaitForInput(['You used a potion...'], () => {
            this.#switchToMainBattleMenu();
          });
        });
      } else {
        this.updateInfoPaneMessagesAndWaitForInput(['You have no potions...'], () => {
          this.#switchToMainBattleMenu();
        });
      }
     
    }
    
    if (this.#selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
      this.#ActiveBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_FLEE;
      this.updateInfoPaneMessagesAndWaitForInput(['Are you really giving up?...'], () => {
        this.#switchToMainBattleMenu();
      })
      return;
    }

  }
  #handlePlayerChooseAttack() {
    console.log("ERROR 6", this.#selectedMoveIndex)

    let selectedMoveIndex = 0;
    switch (this.#selectedAttackMenuOption) {
   
      case ATTACK_MOVE_OPTIONS.MOVE_1:
        console.log("ERROR 7", selectedMoveIndex)
        selectedMoveIndex = 0;
        break;
      case ATTACK_MOVE_OPTIONS.MOVE_2:
        selectedMoveIndex = 1;
        break;
      case ATTACK_MOVE_OPTIONS.MOVE_3:
        selectedMoveIndex = 2;
        break;
      case ATTACK_MOVE_OPTIONS.MOVE_4:
        selectedMoveIndex = 4;
        break;
      default:
        exhaustiveGuard(this.#selectedAttackMenuOption)
    }
    this.#selectedMoveIndex = selectedMoveIndex;
  }
  
}
