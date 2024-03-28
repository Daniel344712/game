import Phaser from '../lib/phaser.js'
import { DATA_ASSET_KEYS } from '../assets/asset-keys.js'

/**
 * @param {Phaser.Scene} scene
 * @returns {import('../types/typedef.js').Animation[]}
 */
export class DataUtils {
    static getAnimations(scene){
        const data = scene.cache.json.get(DATA_ASSET_KEYS.ANIMATIONS)
        return data;
    }
}