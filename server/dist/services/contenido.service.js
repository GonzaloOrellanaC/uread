"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contenido_model_1 = (0, tslib_1.__importDefault)(require("../models/contenido.model"));
const niveles_model_1 = (0, tslib_1.__importDefault)(require("../models/niveles.model"));
const contenido = contenido_model_1.default;
const niveles = niveles_model_1.default;
const guardarContenido = async (contenidoData) => {
    const contenidoResponse = await contenido.create(contenidoData);
    return contenidoResponse;
};
const editarContenido = async (contenidoData) => {
    const contenidoResponse = await contenido.findByIdAndUpdate(contenidoData._id, contenidoData);
    return contenidoResponse;
};
const borrarContenido = async (_id) => {
    const contenidoResponse = await contenido.findByIdAndDelete(_id);
    return contenidoResponse;
};
const leerContenidos = async () => {
    const contenidoResponse = await contenido.find();
    return contenidoResponse;
};
const leerContenidosBasicos = async () => {
    const resNiveles = await niveles.find();
    const contenidoBasicoResponse = await contenido.find({ nivel: resNiveles[0]._id }).populate('nivel');
    return contenidoBasicoResponse;
};
exports.default = {
    guardarContenido,
    editarContenido,
    borrarContenido,
    leerContenidos,
    leerContenidosBasicos
};
//# sourceMappingURL=contenido.service.js.map