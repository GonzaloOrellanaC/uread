"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.en = exports.es = void 0;
const tslib_1 = require("tslib");
const es_json_1 = (0, tslib_1.__importDefault)(require("./es.json"));
exports.es = es_json_1.default;
const en_json_1 = (0, tslib_1.__importDefault)(require("./en.json"));
exports.en = en_json_1.default;
const locales = { es: es_json_1.default, en: en_json_1.default };
exports.default = locales;
//# sourceMappingURL=index.js.map