"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = exports.putNotification = void 0;
const notificaciones_service_1 = require("../services/notificaciones.service");
const putNotification = async (req, res) => {
    const not = req.body;
    try {
        const response = await (0, notificaciones_service_1.editNotification)(not);
        res.status(200).json({ response });
    }
    catch ({ name, message }) {
        res.status(400).json({ name, message });
    }
};
exports.putNotification = putNotification;
const getNotifications = async (req, res) => {
    const { userId, skip, limit } = req.query;
    try {
        const response = await (0, notificaciones_service_1.findNotificationsByUser)(userId, Number(skip), Number(limit));
        res.status(200).json({ response });
    }
    catch ({ name, message }) {
        res.status(400).json({ name, message });
    }
};
exports.getNotifications = getNotifications;
//# sourceMappingURL=notificaciones.controller.js.map