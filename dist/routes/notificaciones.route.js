"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notificaciones_controller_1 = require("../controllers/notificaciones.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.put(`/`, notificaciones_controller_1.putNotification);
router.get(`/getNotifications`, notificaciones_controller_1.getNotifications);
exports.default = router;
//# sourceMappingURL=notificaciones.route.js.map