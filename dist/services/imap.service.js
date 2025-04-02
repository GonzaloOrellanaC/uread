"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmails = void 0;
const tslib_1 = require("tslib");
const node_imap_1 = (0, tslib_1.__importDefault)(require("node-imap"));
const mailparser_1 = require("mailparser");
const logger_1 = require("../utils/logger");
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const alumnos_provisorios_model_1 = (0, tslib_1.__importDefault)(require("../models/alumnos-provisorios.model"));
const email_service_1 = require("./email.service");
const html_1 = require("../utils/html");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const i18n_1 = require("i18n");
function extract(str) {
    const email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    return str.match(email);
}
const obtenerPago = (text) => {
    if (text.includes('3.000')) {
        return '3.000';
    }
    else if (text.includes('6.000')) {
        return '6.000';
    }
    else if (text.includes('9.000')) {
        return '9.000';
    }
    else if (text.includes('12.000')) {
        return '12.000';
    }
    else {
        return 'no value';
    }
};
async function checkEmails(config) {
    const imap = new node_imap_1.default({
        user: config.user,
        password: config.password,
        host: config.host,
        port: config.port,
        tls: config.tls,
    });
    function openInbox(cb) {
        imap.openBox('INBOX', false, cb);
    }
    imap.once('ready', function () {
        openInbox(function (err, box) {
            if (err)
                throw err;
            try {
                imap.search(['UNSEEN', ['SINCE', new Date(Date.now() - 86400000)]], function (err, results) {
                    if (err)
                        throw err;
                    if (results.length === 0) {
                        imap.end();
                        return;
                    }
                    const f = imap.fetch(results, { bodies: '' });
                    f.on('message', function (msg, seqno) {
                        msg.on('body', function (stream, info) {
                            (0, mailparser_1.simpleParser)(stream, async (err, parsed) => {
                                var _a;
                                if (err) {
                                    logger_1.logger.error(err);
                                }
                                else {
                                    logger_1.logger.info(`De: %s ${(_a = parsed.from) === null || _a === void 0 ? void 0 : _a.text}`);
                                    logger_1.logger.info(`De: %s ${parsed.subject}`);
                                }
                                extract(parsed.text).forEach(email => {
                                    if (email !== 'webpaycl@transbank.cl') {
                                        if (email !== 'recepcion.pagos@uread.cl') {
                                            logger_1.logger.info(email);
                                            validarPagos(email, obtenerPago(parsed.text));
                                        }
                                    }
                                });
                                logger_1.logger.info(obtenerPago(parsed.text));
                            });
                        });
                        msg.once('attributes', function (attrs) {
                            const uid = attrs.uid;
                            imap.addFlags(`${uid}:${uid}`, ['Seen'], function (err) {
                                if (err) {
                                    logger_1.logger.error(err);
                                }
                            });
                        });
                        msg.once('end', function () {
                            console.log('Finalizado el mensaje #%d', seqno);
                        });
                    });
                    f.once('error', function (err) {
                        console.log('Error de búsqueda:', err);
                    });
                    f.once('end', function () {
                        console.log('Terminado de obtener todos los mensajes');
                        imap.end();
                    });
                });
            }
            catch ({ name, message }) {
                logger_1.logger.error(`${name} ${message}`);
            }
        });
    });
    imap.once('error', function (err) {
        logger_1.logger.error(err);
    });
    imap.once('end', function () {
        console.log('Conexión IMAP cerrada');
    });
    imap.connect();
}
exports.checkEmails = checkEmails;
const validarPagos = async (email, pago) => {
    console.log(Number(pago.replace('.', '')));
    const precioPagado = Number(pago.replace('.', ''));
    const apoderado = await users_model_1.default.findOne({ email, roles: { $in: ['67d08179b9faf99da335828d'] } });
    const alumnos = await alumnos_provisorios_model_1.default.find({ apoderado: apoderado._id, medioPago: 'transbank' });
    const listaPlanA = [];
    const listaPlanB = [];
    const listaPlanC = [];
    alumnos.forEach((alumno) => {
        if (alumno.plan === 'A') {
            listaPlanA.push(alumno);
        }
        if (alumno.plan === 'B') {
            listaPlanB.push(alumno);
        }
        if (alumno.plan === 'C') {
            listaPlanC.push(alumno);
        }
    });
    const precioPlanA = listaPlanA.length * 3000;
    const precioPlanB = listaPlanB.length * 6000;
    const precioPlanC = listaPlanC.length * 15000;
    if (precioPagado === precioPlanA) {
        listaPlanA.forEach(async (a) => {
            await alumnos_provisorios_model_1.default.findByIdAndUpdate(a._id, { permiteValidar: true });
        });
    }
    if (precioPagado === precioPlanB) {
        listaPlanB.forEach(async (a) => {
            await alumnos_provisorios_model_1.default.findByIdAndUpdate(a._id, { permiteValidar: true });
        });
    }
    if (precioPagado === precioPlanC) {
        listaPlanC.forEach(async (a) => {
            await alumnos_provisorios_model_1.default.findByIdAndUpdate(a._id, { permiteValidar: true });
        });
    }
    const args = {
        fullName: `${apoderado.name} ${apoderado.lastName}`,
        apoderado: `${apoderado.name}`
    };
    await (0, email_service_1.sendPagoValidadoEmail)(apoderado.email, 'Validación de pago', (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/validacion-pago/email.html`), args), null
    /* { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] } */
    ).catch(err => logger_1.logger.error((0, i18n_1.__)({ phrase: err.message, locale: 'es' })));
};
//# sourceMappingURL=imap.service.js.map