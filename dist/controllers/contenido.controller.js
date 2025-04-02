"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contenido_service_1 = (0, tslib_1.__importDefault)(require("../services/contenido.service"));
const contenido_model_1 = (0, tslib_1.__importDefault)(require("../models/contenido.model"));
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
const crearContenidoV2 = async (req, res, next) => {
    console.log(req.body);
    try {
        const response = await contenido_service_1.default.crearContenidoV2(req.body);
        res.status(200).json({ data: response.contenido, message: 'contenido v2 creado' });
    }
    catch (error) {
        next(error);
    }
};
const editarContenidoV2 = async (req, res, next) => {
    console.log(req.body);
    try {
        const response = await contenido_service_1.default.editarContenidoV2(req.body);
        res.status(200).json({ data: response.contenido, message: 'contenido v2 creado' });
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
    const { idGrupos } = req.body;
    console.log(idGrupos);
    try {
        const contenidos = await contenido_service_1.default.leerContenidos(idGrupos);
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' });
    }
    catch (error) {
        next(error);
    }
};
const getTodoContenido = async (req, res, next) => {
    try {
        const contenidos = await contenido_service_1.default.leerContenidos();
        res.status(200).json({ data: contenidos, message: 'lista de contenidos' });
    }
    catch (error) {
        next(error);
    }
};
const leerContenidosV2 = async (req, res, next) => {
    try {
        const contenidos = await contenido_service_1.default.leerContenidosV2();
        res.status(200).json({ data: contenidos, message: 'lista de contenidos v2' });
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
const buscarContenidoPorId = async (_id) => {
    const contenido = await contenido_model_1.default.findById(_id);
    return contenido;
};
exports.default = {
    guardarContenido,
    crearContenidoV2,
    editarContenidoV2,
    editarContenido,
    borrarContenido,
    leerContenidos,
    getTodoContenido,
    leerContenidosV2,
    leerContenidosBasicos,
    buscarContenidoPorId
};
//# sourceMappingURL=contenido.controller.js.map