"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendAsset = exports.asset = exports.isEmpty = void 0;
const env_1 = require("../configs/env");
const path_1 = require("path");
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
/**
 * @method asset
 * @param {String} path - The path of the asset
 * @returns {String} url - The URL of the asset
 * @description Returns a URL for the given path
 */
const asset = (path) => {
    const cleanUrl = env_1.url.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return `${cleanUrl}/${cleanPath}`;
};
exports.asset = asset;
/**
 * @method frontendAsset
 * @param {String} path - The path of the asset
 * @returns {String} path - The output path of the asset
 */
const frontendAsset = (path) => {
    const cleanPath = path.replace(/^\//, '');
    return (0, path_1.join)(__dirname, '../../../client/public', cleanPath);
};
exports.frontendAsset = frontendAsset;
//# sourceMappingURL=util.js.map