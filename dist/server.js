"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const app_1 = (0, tslib_1.__importDefault)(require("./app"));
const startServer = async () => {
    (0, app_1.default)();
};
startServer();
//# sourceMappingURL=server.js.map