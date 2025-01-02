"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contenido_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/contenido.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post(`/guardarContenido`, contenido_controller_1.default.guardarContenido);
router.post(`/editarContenido`, contenido_controller_1.default.editarContenido);
router.post(`/borrarContenido`, contenido_controller_1.default.borrarContenido);
router.get(`/leerContenidos`, contenido_controller_1.default.leerContenidos);
router.get(`/leerContenidosBasicos`, contenido_controller_1.default.leerContenidosBasicos);
router.get(`/leerContenidosV2`, contenido_controller_1.default.leerContenidosV2);
router.post(`/crearContenido`, contenido_controller_1.default.crearContenidoV2);
router.post(`/editarContenidoV2`, contenido_controller_1.default.editarContenidoV2);
exports.default = router;
//# sourceMappingURL=contenido.route.js.map