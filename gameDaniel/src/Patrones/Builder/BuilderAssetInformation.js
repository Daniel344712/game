import { AssetInformation } from "./AssetInformation.js";

export class BuilderAssetInformation{
    #assetInformation;

    constructor(){
        this.#assetInformation = new AssetInformation();
    }

    CreateProduct(assetFrame, assetKey){
        this.#assetInformation = new AssetInformation(assetKey, assetFrame);
    }

    GetProduct(){
        return this.#assetInformation;
    }
}
	