/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export declare const isEmpty: (value: string | number | object) => boolean;
/**
 * @method asset
 * @param {String} path - The path of the asset
 * @returns {String} url - The URL of the asset
 * @description Returns a URL for the given path
 */
export declare const asset: (path: string) => string;
/**
 * @method frontendAsset
 * @param {String} path - The path of the asset
 * @returns {String} path - The output path of the asset
 */
export declare const frontendAsset: (path: string) => string;
