"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contenido_service_1 = (0, tslib_1.__importDefault)(require("../services/contenido.service"));
const guardarContenido = async (req, res, next) => {
    console.log(req.body);
    try {
        const contenido = await contenido_service_1.default.guardarContenido(req.body);
        res.status(200).json({ data: contenido, message: 'contenido creado' });
    }
    catch (error) {
        next(error);
    }
};
const editarContenido = async (req, res, next) => {
    console.log(req.body);
    try {
        const contenido = await contenido_service_1.default.editarContenido(req.body);
        res.status(200).json({ data: contenido, message: 'contenido editado' });
    }
    catch (error) {
        next(error);
    }
};
const borrarContenido = async (req, res, next) => {
    console.log(req.body);
    try {
        await contenido_service_1.default.borrarContenido(req.body._id);
        res.status(200).json({ message: 'contenido borrado' });
    }
    catch (error) {
        next(error);
    }
};
const leerContenidos = async (req, res, next) => {
    try {
        const contenidos = await contenido_service_1.default.leerContenidos();
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' });
    }
    catch (error) {
        next(error);
    }
};
const leerContenidosBasicos = async (req, res, next) => {
    try {
        const contenidos = await contenido_service_1.default.leerContenidosBasicos();
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosBasicos
};
//# sourceMappingURL=contenido.controller.js.map