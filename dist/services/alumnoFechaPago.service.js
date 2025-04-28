"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarPago = exports.pagosAlumno = void 0;
const tslib_1 = require("tslib");
const alumno_fechapago_model_1 = tslib_1.__importDefault(require("../models/alumno-fechapago.model"));
const pagosAlumno = async (alumnoId) => {
    const alumnoFechaPago = await alumno_fechapago_model_1.default.findOne({ alumno: alumnoId });
    return alumnoFechaPago;
};
exports.pagosAlumno = pagosAlumno;
const actualizarPago = async (pagosId, fechaValidacion) => {
    const obtenerPago = await alumno_fechapago_model_1.default.findById(pagosId);
    const pagoObj = Object.assign({}, obtenerPago.toJSON());
    const fechasPagadas = [...pagoObj.fechasPagadas];
    fechasPagadas.push(fechaValidacion);
    const fechasPago = [...pagoObj.fechasPago];
    const nuevaFechaPago = new Date(pagoObj.fechasPago[pagoObj.fechasPago.length - 1]).getTime() + (((60000 * 60) * 24) * 30);
    fechasPago.push(new Date(nuevaFechaPago));
    const pagoAEditar = Object.assign(Object.assign({}, obtenerPago.toJSON()), { fechasPagadas,
        fechasPago });
    const pagoEditado = await alumno_fechapago_model_1.default.findByIdAndUpdate(pagoAEditar._id, pagoAEditar);
    return pagoEditado;
};
exports.actualizarPago = actualizarPago;
//# sourceMappingURL=alumnoFechaPago.service.js.map