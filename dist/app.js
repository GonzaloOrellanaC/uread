"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = (0, tslib_1.__importDefault)(require("compression"));
const cookie_parser_1 = (0, tslib_1.__importDefault)(require("cookie-parser"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const configs_1 = (0, tslib_1.__importDefault)(require("./configs"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const hpp_1 = (0, tslib_1.__importDefault)(require("hpp"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const mongoose_1 = require("mongoose");
const swagger_jsdoc_1 = (0, tslib_1.__importDefault)(require("swagger-jsdoc"));
const swagger_ui_express_1 = (0, tslib_1.__importDefault)(require("swagger-ui-express"));
const _databases_1 = require("./databases");
const error_middleware_1 = (0, tslib_1.__importDefault)(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
const i18n_1 = (0, tslib_1.__importDefault)(require("i18n"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
const index_route_1 = (0, tslib_1.__importDefault)(require("./routes/index.route"));
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("./services/accessControl.service"));
const socket_controller_1 = (0, tslib_1.__importDefault)(require("./controllers/socket.controller"));
const imap_service_1 = require("./services/imap.service");
const imap_1 = require("./configs/imap");
const cron_1 = require("cron");
const users_service_1 = (0, tslib_1.__importDefault)(require("./services/users.service"));
const notificaciones_service_1 = require("./services/notificaciones.service");
const date_1 = require("./utils/date");
const unDia = (60000 * 60) * 24;
const iniciaJob = () => {
    const job = new cron_1.CronJob('*/5 * * * *', function () {
        (0, imap_service_1.checkEmails)({
            user: imap_1.imap_email,
            password: imap_1.imap_password,
            host: imap_1.imap_host,
            port: 993,
            tls: true
        });
    }, () => {
        console.log('Terminado');
    });
    return job;
};
const revisionPayment = async () => {
    const alumnos = await users_service_1.default.findAllStudents();
    const currentDate = new Date().getTime();
    const proximos5Dias = new Date(currentDate + (unDia * 5)).getTime();
    const alumnosPorPagar = [];
    console.log(alumnos.length);
    alumnos.forEach((alumno) => {
        console.log(alumno.name, alumno.lastName);
        if (alumno.alumnoFechaPago !== null) {
            const fechaPago = new Date(alumno.alumnoFechaPago.fechasPago[alumno.alumnoFechaPago.fechasPago.length - 1]).getTime();
            if ((currentDate + proximos5Dias) > fechaPago) {
                alumnosPorPagar.push(alumno);
            }
        }
    });
    alumnosPorPagar.forEach(async (alumno, index) => {
        const currentDate = new Date(alumno.alumnoFechaPago.fechasPago[alumno.alumnoFechaPago.fechasPago.length - 1]).getTime();
        const quinceDias = unDia * 15;
        if (alumno.apoderado) {
            const newNotificationApoderado = {
                title: `Recordatorio próximo pago`,
                detail: `La cuenta de alumno ${alumno.name} ${alumno.lastName} está por vencer.`,
                longText: `Hola ${alumno.apoderado.name} ${alumno.apoderado.lastName}. Saludos desde UREAD. Informamos que el la cuenta de ${alumno.name} vence el próximo ${(0, date_1.dateTranslate)(new Date(currentDate + quinceDias), 'Nombre Día, Fecha ["Día" de "Mes"]')}. Pague con transferencia electrónica bancaria, envíe su comprobante  a recepcion.pagos@uread.cl o Pague con transbank en el siguiente link`,
                links: ['https://www.webpay.cl/form-pay/192335'],
                user: alumno.apoderado,
                idType: 'recordatorio_pago',
                metadata: {
                    alumno: alumno._id
                }
            };
            try {
                const ultimaNotificacion = await (0, notificaciones_service_1.leerUltimaNotificacionPagoPendiente)(alumno.apoderado._id, alumno._id);
                if (ultimaNotificacion !== null) {
                    const cincoDias = unDia * 5;
                    const dosDias = unDia * 2;
                    const fechaUltimaNotificacion = new Date(ultimaNotificacion.createdAt).getTime();
                    if (fechaUltimaNotificacion + cincoDias < Date.now()) {
                        /* console.log(newNotificationApoderado) */
                        const notificacion = await (0, notificaciones_service_1.crearNotificacion)(newNotificationApoderado);
                        console.log(notificacion);
                    }
                    else {
                        console.log('No han pasado más de 5 días desde última notificación.');
                    }
                }
                else {
                    const notificacion = await (0, notificaciones_service_1.crearNotificacion)(newNotificationApoderado);
                    console.log(notificacion);
                }
            }
            catch ({ name, message }) {
                console.log(name, message);
            }
        }
        else {
            console.log(`Alumno name: "${alumno.name}", lastName: "${alumno.lastName}" no tiene apoderado.`);
        }
    });
};
const jobsPayment = () => {
    const job = new cron_1.CronJob('00 12 * * *', () => {
        revisionPayment();
    }, () => {
        console.log('Terminado');
    });
    return job;
};
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
const app = (0, express_1.default)();
const port = configs_1.default.env.port;
const env = configs_1.default.env.environment;
const locale = configs_1.default.env.locale;
const connectToDatabase = async () => {
    if (env !== 'production') {
        (0, mongoose_1.set)('debug', false);
    }
    try {
        await (0, mongoose_1.connect)(_databases_1.dbConnection.url);
        await accessControl_service_1.default.initAccessControl();
        (0, imap_service_1.checkEmails)({
            user: imap_1.imap_email,
            password: imap_1.imap_password,
            host: imap_1.imap_host,
            port: 993,
            tls: true
        });
        iniciaJob().start();
        jobsPayment().start();
        revisionPayment();
    }
    catch (error) {
        console.log(error);
    }
};
const initializeMiddlewares = () => {
    if (env === 'development') {
        app.use((0, morgan_1.default)(configs_1.default.log.format, { stream: logger_1.stream }));
    }
    console.log(1);
    app.use((0, cors_1.default)({ origin: configs_1.default.cors.origin, credentials: configs_1.default.cors.credentials }));
    app.use((0, hpp_1.default)());
    app.use((0, compression_1.default)());
    app.use((0, multer_1.default)().any());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    console.log(2);
    configureI18n();
    app.use(i18n_1.default.init);
    initializeRoutes();
    console.log(3);
    app.use("/audios", express_1.default.static(path_1.default.join(__dirname, '../files/audios')));
    app.use("/mp3", express_1.default.static(path_1.default.join(__dirname, '../files/audios/mp3')));
    app.use("/images", express_1.default.static(path_1.default.join(__dirname, '../files/images')));
    app.use("/pdf", express_1.default.static(path_1.default.join(__dirname, '../files/pdf')));
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../uread/dist")));
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../uread/dist", "index.html"));
    });
    app.use((0, helmet_1.default)());
};
const initializeRoutes = () => {
    app.use('/', index_route_1.default);
};
const initializeSwagger = () => {
    const options = {
        swaggerDefinition: {
            info: {
                title: 'REST API',
                version: '1.0.0',
                description: 'Example docs'
            }
        },
        apis: ['swagger.yaml']
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
const initializeErrorHandling = () => {
    app.use(error_middleware_1.default);
};
const configureI18n = () => {
    i18n_1.default.configure({
        directory: __dirname + '/locales',
        defaultLocale: locale,
        queryParameter: 'language',
        cookie: 'language',
        register: global
    });
};
const App = () => {
    try {
        connectToDatabase();
        initializeMiddlewares();
        initializeSwagger();
        initializeErrorHandling();
        const server = app.listen(port, () => {
            logger_1.logger.info(`====================================`);
            logger_1.logger.info(`============ ENV: ${env} ===========`);
            logger_1.logger.info(`🚀 App listening on the port ${port}`);
            logger_1.logger.info(`====================================`);
        });
        (0, socket_controller_1.default)(server);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = App;
//# sourceMappingURL=app.js.map