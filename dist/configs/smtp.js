"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass_pago_valido = exports.user_pago_valido = exports.pass_bienvenida = exports.from_bienvenida = exports.user_bienvenida = exports.from_email = exports.from_name = exports.pass = exports.user = exports.port = exports.host = void 0;
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
const user_bienvenida = process.env.SMTP_EMAIL_BIENVENIDA;
exports.user_bienvenida = user_bienvenida;
const from_bienvenida = process.env.SMTP_FROM_BIENVENIDA;
exports.from_bienvenida = from_bienvenida;
const pass_bienvenida = process.env.SMTP_PASS_BIENVENIDA;
exports.pass_bienvenida = pass_bienvenida;
const user_pago_valido = process.env.SMTP_EMAIL_PAGO_VALIDO;
exports.user_pago_valido = user_pago_valido;
const pass_pago_valido = process.env.SMTP_PASS_PAGO_VALIDO;
exports.pass_pago_valido = pass_pago_valido;
const smtpConfig = { host, port, user, pass, from_name, from_email, user_bienvenida, from_bienvenida, pass_bienvenida, user_pago_valido, pass_pago_valido };
exports.default = smtpConfig;
//# sourceMappingURL=smtp.js.map