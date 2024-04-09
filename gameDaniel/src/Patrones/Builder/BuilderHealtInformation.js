import { HealthInformation } from "./HealthInformation.js";

export class BuilderHealthInformation{
    #healthInformation;

    constructor(){
        this.#healthInformation = new HealthInformation();
    }

    CreateProduct(currenthp, maxhp){
        this.#healthInformation = new HealthInformation(currenthp, maxhp);
    }

    GetProduct(){
        return this.#healthInformation;
    }
}
	