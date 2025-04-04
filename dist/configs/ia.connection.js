"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
const tslib_1 = require("tslib");
const openai_1 = (0, tslib_1.__importDefault)(require("openai"));
const env_1 = require("./env");
exports.openai = new openai_1.default({
    baseURL: 'https://api.deepseek.com',
    apiKey: env_1.deepSeekApiKey
});
//# sourceMappingURL=ia.connection.js.map