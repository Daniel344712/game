import { AssetInformation } from "./AssetInformation.js";
import { attackInformation } from "./AttackInformation.js";
import { HealthInformation } from "./HealthInformation.js";

export class MonsterDetails {
    /** @type {string}  */
    name
    /** @type {number}  */
    level
    /** @type {HealthInformation}  */
    healthInformation
    /** @type {AssetInformation}  */
    assetInformation
    /** @type {attackInformation}  */
    attackinformation
}