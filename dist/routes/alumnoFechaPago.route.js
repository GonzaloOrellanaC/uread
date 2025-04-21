"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alumnoFechaPago_controller_1 = require("../controllers/alumnoFechaPago.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get(`/getFechaPagos`, alumnoFechaPago_controller_1.getAlumnoFechaPago);
router.post(`/editAlumnoPago`, alumnoFechaPago_controller_1.editAlumnoPago);
exports.default = router;
//# sourceMappingURL=alumnoFechaPago.route.js.map