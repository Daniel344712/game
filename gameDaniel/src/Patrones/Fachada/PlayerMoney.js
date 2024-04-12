export class PlayerMoney{
    getCurrentMonney(){
        return localStorage.getItem('money');
    }
    setCurrentMoney(valor) {
        localStorage.setItem('money', valor);
    }
    
}
