"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDatosFormulario = exports.validarDatos = void 0;
const tslib_1 = require("tslib");
const alumnos_provisorios_model_1 = (0, tslib_1.__importDefault)(require("../models/alumnos-provisorios.model"));
const niveles_model_1 = (0, tslib_1.__importDefault)(require("../models/niveles.model"));
const roles_model_1 = (0, tslib_1.__importDefault)(require("../models/roles.model"));
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const logger_1 = require("../utils/logger");
const validarDatos = async (req, res) => {
};
exports.validarDatos = validarDatos;
const postDatosFormulario = async (req, res) => {
    const data = req.body;
    console.log(data);
    const { alumnos, apoderado } = data;
    console.log(apoderado);
    if (apoderado.name && apoderado.lastName && apoderado.email) {
        try {
            const findRole = await roles_model_1.default.findOne({ name: 'studentRepresentative' });
            apoderado.roles = [findRole._id];
            let apoderadoBD;
            let exist = false;
            const findApoderado = await users_model_1.default.findOne({ email: apoderado.email });
            if (findApoderado) {
                apoderadoBD = findApoderado;
                exist = true;
            }
            else {
                const newApoderado = await users_model_1.default.create(apoderado);
                apoderadoBD = newApoderado;
            }
            const alumnosGuardados = await Promise.all(alumnos.map(async (alumno) => {
                const encontrarNivel = await niveles_model_1.default.findOne({ number: Number(alumno.year) });
                const newAlumno = Object.assign(Object.assign({}, alumno), { levelUser: encontrarNivel._id });
                const alumnoGuardado = await alumnos_provisorios_model_1.default.create(newAlumno);
                return alumnoGuardado._id;
            }));
            alumnosGuardados.forEach((a) => {
                apoderadoBD.alumnos.push(a);
            });
            const apoderadoDatos = await users_model_1.default.findByIdAndUpdate(apoderadoBD._id, apoderadoBD, { new: true }).populate('roles').populate('alumnos');
            res.status(200).json({ msg: 'ok', apoderado: apoderadoDatos, exist });
        }
        catch ({ name, message }) {
            console.log(name);
            console.log(message);
            let msg = '';
            if (message.includes('duplicate key error collection')) {
                msg = `Email ${apoderado.email} ya se encuentra en plataforma.`;
            }
            logger_1.logger.error(msg);
            res.status(400).json({ msg });
        }
    }
};
exports.postDatosFormulario = postDatosFormulario;
//# sourceMappingURL=inscripcion.controller.js.map