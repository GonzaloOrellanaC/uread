"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHTML = void 0;
const tslib_1 = require("tslib");
const handlebars_1 = (0, tslib_1.__importDefault)(require("handlebars"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
/**
 * @method generateHTML
 * @param {String} path - Template path
 * @param {object} args - Data to be passed to the template
 * @returns {string} html - Generated HTML
 * @description Generates HTML from a template and data
 */
const generateHTML = (path, args) => {
    const template = fs_1.default.readFileSync(path, 'utf-8');
    const html = handlebars_1.default.compile(template)(args);
    return html;
};
exports.generateHTML = generateHTML;
//# sourceMappingURL=html.js.map