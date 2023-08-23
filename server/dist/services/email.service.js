"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.sendHTMLEmail = exports.createTransporter = void 0;
const tslib_1 = require("tslib");
const smtp_1 = (0, tslib_1.__importDefault)(require("../configs/smtp"));
const nodemailer_1 = (0, tslib_1.__importDefault)(require("nodemailer"));
const util_1 = require("../utils/util");
/**
 * Create a new email transporter
 * @param {string} host - SMTP host
 * @param {number} port - SMTP port
 * @param {string} user - SMTP user
 * @param {string} pass - SMTP password
 * @returns {nodemailer.Transporter}
 */
const createTransporter = (host, port, user, pass) => {
    if ((0, util_1.isEmpty)(host) || (0, util_1.isEmpty)(port) || (0, util_1.isEmpty)(user) || (0, util_1.isEmpty)(pass)) {
        throw new Error('SMTP credentials are required');
    }
    return nodemailer_1.default.createTransport({ host, port, auth: { user, pass } });
};
exports.createTransporter = createTransporter;
/**
 * Send a HTML email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} html - The HTML body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
const sendHTMLEmail = async (to, subject, html, optionals) => {
    const transporter = (0, exports.createTransporter)(smtp_1.default.host, smtp_1.default.port, smtp_1.default.user, smtp_1.default.pass);
    console.log(transporter);
    return await transporter.sendMail({
        from: (optionals === null || optionals === void 0 ? void 0 : optionals.from) || { name: smtp_1.default.from_name, address: smtp_1.default.from_email },
        to,
        subject,
        html,
        attachments: optionals === null || optionals === void 0 ? void 0 : optionals.attachments
    });
};
exports.sendHTMLEmail = sendHTMLEmail;
/**
 * Send a plain text email
 * @param {string} to - The email address to send to
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text body of the email
 * @param {AddressObject=} from - The email address and name to send from (defaults to the SMTP config)
 */
const sendEmail = async (to, subject, text, optionals) => {
    const transporter = (0, exports.createTransporter)(smtp_1.default.host, smtp_1.default.port, smtp_1.default.user, smtp_1.default.pass);
    console.log(transporter);
    return await transporter.sendMail({
        from: (optionals === null || optionals === void 0 ? void 0 : optionals.from) || { name: smtp_1.default.from_name, address: smtp_1.default.from_email },
        to,
        subject,
        text,
        attachments: optionals === null || optionals === void 0 ? void 0 : optionals.attachments
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map