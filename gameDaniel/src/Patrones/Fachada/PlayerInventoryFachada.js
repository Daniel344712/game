import { PlayerItems } from "./PlayerItems.js";
import { PlayerMoney } from "./PlayerMoney.js";

export class PlayerInventoryFacade {
    constructor() {
        this.playerItems = new PlayerItems();
        this.playerMoney = new PlayerMoney();

        if (this.playerItems.getCurrentPotions() == null || this.playerItems.getCurrentPotions() == undefined) {
            this.playerItems.setCurrentPotions('0');
        }
        if (this.playerMoney.getCurrentMonney() == null || this.playerMoney.getCurrentMonney() == undefined) {
            this.playerMoney.setCurrentMoney('100');
        }
    }

    canBuyPotion() {
        const currentMoney = Number(this.playerMoney.getCurrentMonney());
        const potionPrice = Number(this.playerItems.getPotionPrice());
       
        if (currentMoney >= potionPrice) {
           return true;
        } else {
            return false;
        }
    }

    getCurrentMoney()
    {
        return this.playerMoney.getCurrentMonney();
    }

    canUsePotion() {
        const currentPotions = this.playerItems.getCurrentPotions();
        if (Number(currentPotions) > 0) {
            return true;
        } else {
            return false;
        }
    }

    usePotion() {
        var currentPotions = this.playerItems.getCurrentPotions();
        var newPotions = parseInt(currentPotions) - 1;
        this.playerItems.setCurrentPotions(newPotions.toString());
    }

    buyPotion(){
        var newMoney = Number(this.playerMoney.getCurrentMonney()) - this.playerItems.getPotionPrice();
        this.playerMoney.setCurrentMoney(newMoney.toString());
       
        var currentPotions = this.playerItems.getCurrentPotions();
        var newPotions = parseInt(currentPotions) + 1;
        this.playerItems.setCurrentPotions(newPotions.toString());
    }
}
