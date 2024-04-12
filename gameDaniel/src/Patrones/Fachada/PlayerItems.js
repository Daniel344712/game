export class PlayerItems {
    getCurrentPotions() {
        return localStorage.getItem('potions');
    }

    setCurrentPotions(valor) {
        localStorage.setItem('potions', valor);
    }

    getPotionPrice() {
      return 20;
    }
}