"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lenguaje_model_1 = tslib_1.__importDefault(require("../models/lenguaje.model"));
const lenguaje = lenguaje_model_1.default;
const leerContenidos = async () => {
    const lenguajesResponse = await lenguaje.find();
    return lenguajesResponse;
};
exports.default = {
    leerContenidos
};
//# sourceMappingURL=lenguaje.service.js.map