"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lenguaje_service_1 = tslib_1.__importDefault(require("../services/lenguaje.service"));
const leerContenidos = async (req, res, next) => {
    try {
        const lenguajes = await lenguaje_service_1.default.leerContenidos();
        res.status(200).json({ data: lenguajes, message: 'lista de lenguajes' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    leerContenidos
};
//# sourceMappingURL=lenguaje.controller.js.map