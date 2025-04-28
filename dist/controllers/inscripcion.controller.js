"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDatosFormulario = exports.validarDatos = void 0;
const tslib_1 = require("tslib");
const alumnos_provisorios_model_1 = tslib_1.__importDefault(require("../models/alumnos-provisorios.model"));
const niveles_model_1 = tslib_1.__importDefault(require("../models/niveles.model"));
const validarDatos = async (req, res) => {
};
exports.validarDatos = validarDatos;
const postDatosFormulario = async (req, res) => {
    const data = req.body;
    const { alumnos } = data;
    try {
        const alumnosGuardados = await Promise.all(alumnos.map(async (alumno) => {
            const encontrarNivel = await niveles_model_1.default.findOne({ number: Number(alumno.year) });
            const newAlumno = Object.assign(Object.assign({}, alumno), { levelUser: encontrarNivel._id });
            const alumnoGuardado = await alumnos_provisorios_model_1.default.create(newAlumno);
            return alumnoGuardado;
        }));
        res.status(200).json({ msg: 'ok', alumnosGuardados });
    }
    catch ({ name, message }) {
        console.log(name);
        console.log(message);
        res.status(400).json({ msg: `${name}: ${message}` });
    }
};
exports.postDatosFormulario = postDatosFormulario;
//# sourceMappingURL=inscripcion.controller.js.map