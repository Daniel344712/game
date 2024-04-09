
export class AssetInformation {
    /**@type {string} */
    assetKey
    /**@type {number} */
    assetFrame
    constructor(assetKey, assetFrame) {
      this.assetFrame = assetFrame;
      this.assetKey = assetKey;
    }
  }