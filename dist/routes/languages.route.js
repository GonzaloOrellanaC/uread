"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lenguaje_controller_1 = tslib_1.__importDefault(require("../controllers/lenguaje.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get(`/leerLenguajes`, lenguaje_controller_1.default.leerContenidos);
exports.default = router;
//# sourceMappingURL=languages.route.js.map