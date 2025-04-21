"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAlumnoPago = exports.getAlumnoFechaPago = void 0;
const alumnoFechaPago_service_1 = require("../services/alumnoFechaPago.service");
const getAlumnoFechaPago = async (req, res) => {
    const { alumnoId } = req.query;
    const pagos = await (0, alumnoFechaPago_service_1.pagosAlumno)(alumnoId);
    res.status(200).json({ pagos });
};
exports.getAlumnoFechaPago = getAlumnoFechaPago;
const editAlumnoPago = async (req, res) => {
    const data = req.body;
    const pagoEditado = await (0, alumnoFechaPago_service_1.actualizarPago)(data.pagosId, new Date(data.fechaValidacion));
    console.log(pagoEditado);
    res.status(200).json({ pagoEditado });
};
exports.editAlumnoPago = editAlumnoPago;
//# sourceMappingURL=alumnoFechaPago.controller.js.map