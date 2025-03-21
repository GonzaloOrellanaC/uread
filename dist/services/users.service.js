"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const configs_1 = require("../configs");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const util_1 = require("../utils/util");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const i18n_1 = require("i18n");
const auth_service_1 = require("./auth.service");
const email_service_1 = require("./email.service");
const html_1 = require("../utils/html");
const logger_1 = require("../utils/logger");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const alumnos_provisorios_model_1 = (0, tslib_1.__importDefault)(require("../models/alumnos-provisorios.model"));
const roles_model_1 = (0, tslib_1.__importDefault)(require("../models/roles.model"));
const user = users_model_1.default;
const findAllUser = async () => {
    const users = await user.find().populate('roles').populate('levelUser');
    return users;
};
const findAllAdminUser = async () => {
    const users = await user.find().populate('roles');
    return users;
};
const findAllSystemUser = async () => {
    const users = await user.find({ organization: { $in: [[]] } }).populate('roles').populate('organization');
    return users;
};
const getUsersByOrg = async (orgId) => {
    const users = await user.find({ organization: { $in: [{ _id: orgId }] } }).populate('roles').populate('organization');
    return users;
};
const findSupervisores = async () => {
    const users = await user.find({ subRoles: { $in: ['Supervisor'] } });
    return users;
};
const findOperadores = async () => {
    const users = await user.find({ subRoles: { $in: ['Operador'] } });
    return users;
};
const findUserById = async (userId) => {
    if ((0, util_1.isEmpty)(userId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale: 'es' }));
    const findUser = await user.findOne({ _id: userId }, '-password').populate('roles').populate('organization');
    if (!findUser)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'User not found', locale: 'es' }));
    return findUser;
};
const editUser = async (usuario, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(user))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Datos de usuario no encontrados', locale }));
    const findUser = await user.findByIdAndUpdate(usuario._id, usuario, { new: true }).populate('roles').populate('organization').populate({
        path: 'alumnos',
        populate: {
            path: 'levelUser'
        }
    }).populate('levelUser');
    if (!findUser)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return findUser;
};
const findUsersByRole = (role) => {
    return new Promise(async (resolve) => {
        if ((0, util_1.isEmpty)(role))
            throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ROLE is required' }));
        const findUsers = await user.find({ role: role });
        if (!findUsers)
            throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Users not found' }));
        resolve(findUsers);
    });
};
const createAdminSysUser = async (userData, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(userData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required', locale }));
    const findUser = await user.findOne({ email: userData.email }, '-password'); // .select('-password')
    if (findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email }));
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const users = await findAllUser();
    userData.idUser = users.length + 1;
    const createUserData = await user.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    return createUserData;
};
const createUser = async (userData, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(userData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required', locale }));
    const findUser = await user.findOne({ email: userData.email }, '-password'); // .select('-password')
    if (findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email }));
    const lastUser = await users_model_1.default.find().sort({ _id: -1 }).limit(1);
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    userData.idUser = lastUser[0].idUser + 1;
    const createUserData = await user.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    return createUserData;
};
const updateUser = async (userId, userData, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(userId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale }));
    if ((0, util_1.isEmpty)(userData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'User data is required', locale }));
    if (userData.email) {
        const findUser = await user.findOne({ email: userData.email });
        if (findUser && findUser._id.toString() !== userId)
            throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} already exists', locale }, { email: userData.email }));
    }
    if (userData.password) {
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        userData = Object.assign(Object.assign({}, userData), { password: hashedPassword });
    }
    const updateUserById = await user.findByIdAndUpdate(userId, { userData });
    if (!updateUserById)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return updateUserById;
};
const deleteUser = async (userId, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(userId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale }));
    const deleteUserById = await user.findByIdAndDelete(userId);
    if (!deleteUserById)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return deleteUserById;
};
const validar = async (user) => {
    try {
        const resetToken = (0, auth_service_1.createToken)(user);
        const args = {
            fullName: `${user.name} ${user.lastName}`,
            resetLink: `${configs_1.env.url}bienvenida/${resetToken.token}`
        };
        await (0, email_service_1.sendHTMLEmail)(user.email, 'Bienvenid@ a UREAD', (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/bienvenida/email.html`), args), null);
        const userEdited = await users_model_1.default.findByIdAndUpdate(user._id, { validado: 'Por validar' }, { new: true });
        return userEdited;
    }
    catch (error) {
        logger_1.logger.error((0, i18n_1.__)({ phrase: error.message, locale: 'es' }));
        return null;
    }
};
const habilitarAlumno = async (user) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        const createUserData = await users_model_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        const args = {
            fullName: `${createUserData.name} ${createUserData.lastName}`,
        };
        await (0, email_service_1.sendHTMLEmail)(user.email, 'Bienvenid@ a UREAD', (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/bienvenida-alumno/email.html`), args), null);
        const rolAlumno = await roles_model_1.default.findOne({ name: 'user' });
        await users_model_1.default.findByIdAndUpdate(user._id, {
            validado: 'Validado',
            roles: [rolAlumno._id]
        }, { new: true });
        const alumnoEditado = await alumnos_provisorios_model_1.default.findByIdAndUpdate(user._id, { state: false }, { new: true }).populate('levelUser');
        return alumnoEditado;
    }
    catch (error) {
        logger_1.logger.error((0, i18n_1.__)({ phrase: error.message, locale: 'es' }));
        return null;
    }
};
const camibiarPassword = async (userId, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const findUser = await users_model_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
    return findUser;
};
exports.default = {
    findAllUser,
    findAllAdminUser,
    findSupervisores,
    findAllSystemUser,
    getUsersByOrg,
    findOperadores,
    findUserById,
    editUser,
    findUsersByRole,
    createUser,
    createAdminSysUser,
    updateUser,
    deleteUser,
    validar,
    habilitarAlumno,
    camibiarPassword
};
//# sourceMappingURL=users.service.js.map