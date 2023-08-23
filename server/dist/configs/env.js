"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageApi = exports.platformName = exports.url = exports.password = exports.email = exports.run = exports.lastName = exports.name = exports.locale = exports.port = exports.environment = void 0;
const environment = process.env.NODE_ENV;
exports.environment = environment;
const port = parseInt(process.env.PORT);
exports.port = port;
const locale = process.env.DEFAULT_LANGUAGE;
exports.locale = locale;
const name = process.env.NAME;
exports.name = name;
const lastName = process.env.LASTNAME;
exports.lastName = lastName;
const run = process.env.RUN;
exports.run = run;
const email = process.env.EMAIL;
exports.email = email;
const password = process.env.PASSWORD;
exports.password = password;
const url = process.env.URL || `http://localhost:${port}`;
exports.url = url;
const platformName = process.env.PLATFORM_NAME;
exports.platformName = platformName;
const storageApi = {
    accessKeys: process.env.ACCESS_KEYS
};
exports.storageApi = storageApi;
const env = { environment, port, locale, name, lastName, run, email, password, url, platformName, storageApi };
exports.default = env;
//# sourceMappingURL=env.js.map