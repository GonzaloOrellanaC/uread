"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from_email = exports.from_name = exports.pass = exports.user = exports.port = exports.host = void 0;
/* eslint-disable camelcase */
const host = process.env.SMTP_HOST;
exports.host = host;
const port = parseInt(process.env.SMTP_PORT);
exports.port = port;
const user = process.env.SMTP_USER;
exports.user = user;
const pass = process.env.SMTP_PASS;
exports.pass = pass;
const from_name = process.env.SMTP_FROM_NAME;
exports.from_name = from_name;
const from_email = process.env.SMTP_FROM_EMAIL;
exports.from_email = from_email;
const smtpConfig = { host, port, user, pass, from_name, from_email };
exports.default = smtpConfig;
//# sourceMappingURL=smtp.js.map