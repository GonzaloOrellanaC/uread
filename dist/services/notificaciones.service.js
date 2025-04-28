"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerUltimaNotificacionPagoPendiente = exports.leerNotificaciones = exports.findNotificationsByUser = exports.editNotification = exports.crearNotificacion = void 0;
const tslib_1 = require("tslib");
const notificaciones_model_1 = tslib_1.__importDefault(require("../models/notificaciones.model"));
const crearNotificacion = async (not) => {
    const response = await notificaciones_model_1.default.create(not);
    return response;
};
exports.crearNotificacion = crearNotificacion;
const editNotification = async (not) => {
    const response = await notificaciones_model_1.default.findByIdAndUpdate(not._id, not);
    return response;
};
exports.editNotification = editNotification;
const findNotificationsByUser = async (userId, skip, limit) => {
    const response = await notificaciones_model_1.default.find({ user: userId }).sort({ _id: -1 }).skip(skip).limit(limit).populate('metadata.alumno');
    return response;
};
exports.findNotificationsByUser = findNotificationsByUser;
const leerNotificaciones = async (query = {}) => {
    const response = await notificaciones_model_1.default.find(query).populate('user');
    return response;
};
exports.leerNotificaciones = leerNotificaciones;
const leerUltimaNotificacionPagoPendiente = async (userId, alumnoId) => {
    const response = await notificaciones_model_1.default.find({ idType: 'recordatorio_pago', user: userId, 'metadata.alumno': alumnoId }).sort({ _id: -1 }).limit(1);
    if (response.length > 0) {
        return response[0];
    }
    else {
        return null;
    }
};
exports.leerUltimaNotificacionPagoPendiente = leerUltimaNotificacionPagoPendiente;
//# sourceMappingURL=notificaciones.service.js.map