"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const tslib_1 = require("tslib");
require("dotenv/config");
const app_1 = (0, tslib_1.__importDefault)(require("./app"));
const startServer = async () => {
    (0, app_1.default)();
};
exports.startServer = startServer;
(0, exports.startServer)();
//# sourceMappingURL=server.js.map