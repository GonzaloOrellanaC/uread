"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inscripcion_controller_1 = require("../controllers/inscripcion.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', inscripcion_controller_1.postDatosFormulario);
exports.default = router;
//# sourceMappingURL=inscripcion.route.js.map