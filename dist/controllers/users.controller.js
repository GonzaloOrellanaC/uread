"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = require("../configs/env");
const users_service_1 = tslib_1.__importDefault(require("../services/users.service"));
const organizations_model_1 = tslib_1.__importDefault(require("../models/organizations.model"));
const users_service_2 = tslib_1.__importDefault(require("../services/users.service"));
const alumnos_provisorios_model_1 = tslib_1.__importDefault(require("../models/alumnos-provisorios.model"));
const getUsers = async (req, res, next) => {
    try {
        const findAllUsersData = await users_service_1.default.findAllUser();
        res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    }
    catch (error) {
        console.log(error);
    }
};
const getAdminUsers = async (req, res, next) => {
    try {
        const findAllUsersData = await users_service_1.default.findAllAdminUser();
        res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    }
    catch (error) {
        console.log(error);
    }
};
const getAllSystemUser = async (req, res, next) => {
    try {
        const findAllSystemUserData = await users_service_1.default.findAllSystemUser();
        res.status(200).json({ data: findAllSystemUserData, message: 'findAll' });
    }
    catch (error) {
        console.log(error);
    }
};
const getUsersByOrg = async (req, res, next) => {
    try {
        const { orgId } = req.body;
        const findUsers = await users_service_1.default.getUsersByOrg(orgId);
        res.status(200).json({ data: findUsers, message: 'findOne' });
    }
    catch (error) {
        console.log(error);
    }
};
const getUserById = async (req, res, next) => {
    try {
        const userId = req.body.id;
        const findOneUserData = await users_service_1.default.findUserById(userId);
        res.status(200).json({ data: findOneUserData, message: 'findOne' });
    }
    catch (error) {
        console.log(error);
    }
};
const createAdminSysUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const userLocale = req.cookies.language || env_1.locale;
        const createUserData = await users_service_1.default.createUser(userData, userLocale);
        res.status(201).json({ data: createUserData, message: 'created' });
    }
    catch (error) {
        console.log(error);
    }
};
const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const userLocale = req.cookies.language || env_1.locale;
        const createUserData = await users_service_1.default.createUser(userData, userLocale);
        if (createUserData.organization[0]) {
            await organizations_model_1.default.findOneAndUpdate({ _id: createUserData.organization[0]._id }, { $push: { users: createUserData._id } });
        }
        await users_service_2.default.validar(createUserData);
        res.status(201).json({ data: [createUserData], message: 'created' });
    }
    catch (error) {
        res.status(401).json({ data: error, message: 'error' });
        console.log(error);
    }
};
const editUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await users_service_1.default.editUser(userData);
        res.status(200).json({ user, message: 'updated' });
    }
    catch (error) {
        console.log(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const userId = req.body._id;
        const userLocale = req.cookies.language || env_1.locale;
        const deleteUserData = await users_service_1.default.deleteUser(userId, userLocale);
        res.status(200).json({ data: deleteUserData, message: 'deleted' });
    }
    catch (error) {
        console.log(error);
    }
};
const validarUsuario = async (req, res, next) => {
    try {
        const { usuario } = req.body;
        const deleteUserData = await users_service_1.default.validar(usuario);
        res.status(200).json({ data: deleteUserData, message: 'validado' });
    }
    catch ({ name, message }) {
        console.log({ name, message });
        res.status(200).json({ data: { name }, message });
    }
};
const usuarioDesdeToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        const userData = await users_service_1.default.userFromToken(token);
        const { findUser, grupos } = userData;
        res.status(200).json({ findUser, grupos, message: 'validado' });
    }
    catch ({ name, message }) {
        console.log({ name, message });
        res.status(200).json({ data: { name }, message });
    }
};
const habilitarUsuarioDesdeAlumno = async (req, res, next) => {
    try {
        const { alumno } = req.body;
        const userData = await users_service_1.default.habilitarAlumno(alumno);
        res.status(200).json({ user: userData, message: 'validado' });
    }
    catch (error) {
        console.error('Error', error);
        res.status(400).json({ error });
    }
};
const cambiarPassword = async (req, res, next) => {
    try {
        const { userId, password } = req.body;
        console.log(userId, password);
        const userData = await users_service_1.default.camibiarPassword(userId, password);
        res.status(200).json({ user: userData, msg: 'Password Cambiada con éxito' });
    }
    catch ({ name, message }) {
        console.log({ name, message });
        res.status(200).json({ data: { name }, message });
    }
};
const alumnosUsuario = async (req, res) => {
    const { idUser } = req.query;
    console.log(idUser);
    try {
        const alumnos = await alumnos_provisorios_model_1.default.find({ apoderado: idUser }).populate('levelUser');
        res.status(200).json({ alumnos });
    }
    catch ({ name, message }) {
        console.log(name, message);
        res.status(400).json({ name, message });
    }
};
const leerAlumnos = async (req, res) => {
    try {
        const alumnos = await alumnos_provisorios_model_1.default.find().populate('levelUser').populate('apoderado');
        res.status(200).json({ alumnos });
    }
    catch ({ name, message }) {
        console.log(name, message);
        res.status(400).json({ name, message });
    }
};
const crearAlumno = async (req, res) => {
    const alumno = req.body;
    try {
        const nuevoAlumno = await alumnos_provisorios_model_1.default.create(alumno);
        res.status(200).json({ nuevoAlumno });
    }
    catch ({ name, message }) {
        console.log(name, message);
        res.status(400).json({ name, message });
    }
};
const editarAlumno = async (req, res) => {
    const { alumno } = req.body;
    console.log(alumno);
    try {
        const alumnoEditado = await alumnos_provisorios_model_1.default.findByIdAndUpdate(alumno._id, alumno, { new: true }).populate('apoderado');
        res.status(200).json({ alumno: alumnoEditado });
    }
    catch ({ name, message }) {
        console.log(name, message);
        res.status(400).json({ name, message });
    }
};
exports.default = {
    getUsers,
    getAdminUsers,
    getUserById,
    getAllSystemUser,
    getUsersByOrg,
    createAdminSysUser,
    createUser,
    editUser,
    deleteUser,
    validarUsuario,
    usuarioDesdeToken,
    habilitarUsuarioDesdeAlumno,
    cambiarPassword,
    alumnosUsuario,
    leerAlumnos,
    crearAlumno,
    editarAlumno
};
//# sourceMappingURL=users.controller.js.map