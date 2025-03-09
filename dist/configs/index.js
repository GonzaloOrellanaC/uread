"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtp = exports.cors = exports.log = exports.keys = exports.dbConfig = exports.env = void 0;
const tslib_1 = require("tslib");
const env_1 = (0, tslib_1.__importDefault)(require("./env"));
exports.env = env_1.default;
const keys_1 = (0, tslib_1.__importDefault)(require("./keys"));
exports.keys = keys_1.default;
const dbConfig_1 = (0, tslib_1.__importDefault)(require("./dbConfig"));
exports.dbConfig = dbConfig_1.default;
const cors_1 = (0, tslib_1.__importDefault)(require("./cors"));
exports.cors = cors_1.default;
const log_1 = (0, tslib_1.__importDefault)(require("./log"));
exports.log = log_1.default;
const smtp_1 = (0, tslib_1.__importDefault)(require("./smtp"));
exports.smtp = smtp_1.default;
const config = {
    env: env_1.default,
    dbConfig: dbConfig_1.default,
    keys: keys_1.default,
    log: log_1.default,
    cors: cors_1.default,
    smtp: smtp_1.default
};
exports.default = config;
//# sourceMappingURL=index.js.map