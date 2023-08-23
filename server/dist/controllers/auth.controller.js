"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = require("../configs/env");
const auth_service_1 = (0, tslib_1.__importDefault)(require("../services/auth.service"));
const signUp = async (req, res, next) => {
    try {
        const userData = req.body;
        const { cookie, createdUser } = await auth_service_1.default.signup(userData);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(201).json({ data: createdUser, message: 'Su correo ha sido registrado. Revise su correo para finalizar el proceso. En caso de no encontrarlo en su bandeja de entrada revise el SPAM.' });
    }
    catch (error) {
        next(error);
    }
};
const resendVerification = async (req, res, next) => {
    try {
        const userData = req.body.user;
        const { cookie, user } = await auth_service_1.default.resendVerification(userData);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(201).json({ data: user, message: `${user.name} ${user.lastName} tu correo no ha sido verificado. Revisa tu bandeja de entrada para ejecutar la verificación y vuelve a iniciar sesión` });
    }
    catch (error) {
        next(error);
    }
};
const logIn = async (req, res, next) => {
    try {
        const userData = req.body;
        const userLocale = req.cookies.language || env_1.locale;
        const { cookie, findUser, token } = await auth_service_1.default.login(userData, userLocale);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(200).json({ data: findUser, token: token.token, message: 'login' });
    }
    catch (error) {
        next(error);
    }
};
const logOut = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log(userData);
        const userLocale = req.cookies.language || env_1.locale;
        const logOutUserData = await auth_service_1.default.logout(userData, userLocale);
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        res.status(200).json({ data: logOutUserData, message: 'logout' });
    }
    catch (error) {
        next(error);
    }
};
const verifyUserEmail = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token.toString();
        const userId = auth_service_1.default.verifyToken(token, true)._id;
        const verifyUserData = await auth_service_1.default.verifyUserEmail(userId);
        res.status(200).json({ data: verifyUserData, message: 'verified' });
    }
    catch (error) {
        next(error);
    }
};
const forgotPassword = async (req, res, next) => {
    var _a, _b;
    try {
        const email = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
        const resetUserPassword = await auth_service_1.default.forgotPassword(email);
        res.status(200).json({ data: resetUserPassword, message: 'email sent' });
    }
    catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token.toString();
        const password = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password) === null || _c === void 0 ? void 0 : _c.toString();
        console.log(token, password);
        const resetUserPassword = await auth_service_1.default.resetPassword(token, password);
        res.status(200).json({ data: resetUserPassword, message: 'password reset' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    signUp,
    resendVerification,
    logIn,
    logOut,
    verifyUserEmail,
    forgotPassword,
    resetPassword
};
//# sourceMappingURL=auth.controller.js.map