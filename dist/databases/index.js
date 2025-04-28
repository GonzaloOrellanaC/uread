"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const tslib_1 = require("tslib");
const dbConfig_1 = require("../configs/dbConfig");
const configs_1 = tslib_1.__importDefault(require("../configs"));
const env = configs_1.default.env.environment;
let url;
if (env === 'production') {
    url = dbConfig_1.completUrl;
}
else {
    url = dbConfig_1.completUrl; // `mongodb://${host}:${port}/${database}`
}
exports.dbConnection = {
    url: url,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
};
//# sourceMappingURL=index.js.map