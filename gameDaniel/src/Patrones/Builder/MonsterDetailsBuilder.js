import { MonsterDetails } from "./MonsterDetails.js";

export class MonsterDetailsBuilder {
    CreateConfiguration(name, assetInformation, healthInformation, attackInformation, level) {


        var monsterDetails = new MonsterDetails();
        monsterDetails.name = name;
        monsterDetails.level = level;
        monsterDetails.assetInformation = assetInformation;
        monsterDetails.healthInformation = healthInformation;
        monsterDetails.attackinformation = attackInformation;

        return monsterDetails;
    }
}
