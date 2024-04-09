import { attackInformation } from "./AttackInformation.js";


export class BuilderAttackInformation{
    #attackInformation;

    constructor(){
        this.#attackInformation = new attackInformation();
    }

    CreateProduct(attackIds, baseAttack){
        this.#attackInformation = new attackInformation(attackIds, baseAttack);
    }

    GetProduct(){
        return this.#attackInformation;
    }
}
	