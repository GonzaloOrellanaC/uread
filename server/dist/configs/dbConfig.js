"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completUrl = exports.port = exports.database = exports.host = void 0;
const host = process.env.DB_HOST || 'localhost';
exports.host = host;
const database = process.env.DB_DATABASE || 'mongoose';
exports.database = database;
const port = parseInt(process.env.DB_PORT) || 27017;
exports.port = port;
const completUrl = process.env.COMPLET_URL;
exports.completUrl = completUrl;
const dbConfig = { host, database, port };
exports.default = dbConfig;
//# sourceMappingURL=dbConfig.js.map