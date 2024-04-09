import { BuilderAssetInformation } from "./BuilderAssetInformation.js";
import { BuilderAttackInformation } from "./BuilderAttackInformation.js";
import { BuilderHealthInformation } from "./BuilderHealtInformation.js";
import { MonsterDetailsBuilder } from "./MonsterDetailsBuilder.js";

export class Director {
    CreateConfiguration(name, assetKey, assetFrame, currentHp, maxHp, attackIds, baseAttack, level) {
        var builderAssetInformation = new BuilderAssetInformation();
        var builderHealth = new BuilderHealthInformation();
        var builderAttack = new BuilderAttackInformation();

        builderAssetInformation.CreateProduct(assetFrame, assetKey);
        builderHealth.CreateProduct(currentHp, maxHp);
        builderAttack.CreateProduct(attackIds, baseAttack);

        var builderConfig = new MonsterDetailsBuilder();
        return builderConfig.CreateConfiguration(
            name,
            builderAssetInformation.GetProduct(),
            builderHealth.GetProduct(),
            builderAttack.GetProduct(),
            level);
    }
}
