"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookie = exports.verifyToken = exports.createToken = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../configs/index");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const util_1 = require("../utils/util");
const logger_1 = require("../utils/logger");
const html_1 = require("../utils/html");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const i18n_1 = require("i18n");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const email_service_1 = require("./email.service");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const gruposNiveles_model_1 = (0, tslib_1.__importDefault)(require("../models/gruposNiveles.model"));
const user = users_model_1.default;
const signup = async (userData) => {
    if ((0, util_1.isEmpty)(userData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required' }));
    const findUser = await user.findOne({ email: userData.email }).populate('roles');
    if (findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} already exists' }, { email: userData.email }));
    const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
    const createUserData = await user.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    const loginToken = (0, exports.createToken)(createUserData);
    const cookie = /* createCookie(loginToken) */ '';
    const verificationToken = (0, exports.createToken)(createUserData);
    const args = {
        fullName: `${createUserData.name} ${createUserData.lastName}`,
        email: createUserData.email,
        verifyLink: (0, util_1.asset)(`/validate-password/verify?token=${verificationToken.token}`),
        platformURL: index_1.env.url,
        platformName: index_1.env.platformName
    };
    console.log(args);
    console.log(path_1.default.join(__dirname, `/../../emailTemplates/verify.email.template/es.html`));
    (0, email_service_1.sendHTMLEmail)(createUserData.email, (0, i18n_1.__)({ phrase: 'Verify your email', locale: 'es' }), (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/verify.email.template/es.html`), args), null
    /* { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] } */
    ).catch(err => { console.log(err); logger_1.logger.error((0, i18n_1.__)({ phrase: err.message /* , locale */ })); });
    return { cookie, createdUser: createUserData };
};
const resendVerification = async (userData) => {
    const loginToken = (0, exports.createToken)(userData);
    const cookie = ''; /* createCookie(loginToken) */
    const verificationToken = (0, exports.createToken)(userData);
    const args = {
        fullName: `${userData.name} ${userData.lastName}`,
        email: userData.email,
        verifyLink: (0, util_1.asset)(`/validate-password/verify?token=${verificationToken.token}`),
        platformURL: index_1.env.url,
        platformName: index_1.env.platformName
    };
    (0, email_service_1.sendHTMLEmail)(userData.email, (0, i18n_1.__)({ phrase: 'Verify your email', locale: 'es' }), (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/verify.email.template/es.html`), args), null
    /* { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] } */
    ).catch(err => { console.log(err); logger_1.logger.error((0, i18n_1.__)({ phrase: err.message })); });
    return { cookie, user: userData };
};
const login = async (userData, locale = index_1.env.locale) => {
    try {
        console.log(userData);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required', locale }));
        const findUser = await user.findOne({ email: userData.email }).populate('roles').populate('organization').populate({
            path: 'alumnos',
            populate: {
                path: 'levelUser'
            }
        }).populate('levelUser');
        if (!findUser)
            throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} not found', locale }, { email: userData.email }));
        let grupos;
        const roles = findUser.roles;
        console.log(findUser.levelUser);
        if (roles[0] && roles[0].name === 'user' && findUser.levelUser && findUser.levelUser._id) {
            grupos = await gruposNiveles_model_1.default.find({ cursos: { $in: [findUser.levelUser._id] } });
        }
        console.log(grupos);
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Wrong password', locale }));
        const token = (0, exports.createToken)(findUser);
        const cookie = ''; /* createCookie(token) */
        return { cookie, findUser, token, grupos };
    }
    catch ({ name, message }) {
        logger_1.logger.error(`Error logging in | ${name}: ${message}`);
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Error logging in', locale }));
    }
};
const logout = async (userData, locale = index_1.env.locale) => {
    if ((0, util_1.isEmpty)(userData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required', locale }));
    const findUser = await user.findOne({ email: userData.email /* , password: userData.password */ });
    if (!findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} not found', locale }, { email: userData.email }));
    return findUser;
};
const verifyUserEmail = async (userId /* locale: string = env.locale */) => {
    if ((0, util_1.isEmpty)(userId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale: 'es' }));
    let findUser = await user.findOne({ _id: userId });
    if (!findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'User not found', locale: 'es' }));
    findUser.emailVerifiedAt = new Date();
    findUser = await findUser.save();
    if (!findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Unable to update user', locale: 'es' }));
    return findUser;
};
/**
 * Initiates reset password process for a given email
 * @param {*} email Email for which to initiate the reset password process
 * @returns Object, data to generate email to send (reset token, fullname, email)
 */
const forgotPassword = async (email) => {
    const findUser = await user.findOneAndUpdate({ email }, { updatedAt: new Date() }, { new: true, timestamps: false });
    if ((0, util_1.isEmpty)(findUser))
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} not found', locale: 'es' }, { email }));
    const resetToken = (0, exports.createToken)(findUser);
    const args = {
        fullName: `${findUser.name} ${findUser.lastName}`,
        resetLink: `${index_1.env.url}reset-password/${resetToken.token}`
    };
    await (0, email_service_1.sendHTMLEmail)(findUser.email, (0, i18n_1.__)({ phrase: 'Reset your password', locale: 'es' }), (0, html_1.generateHTML)(path_1.default.join(__dirname, `/../../emailTemplates/reset-password/email.html`), args), null
    /* { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] } */
    ).catch(err => logger_1.logger.error((0, i18n_1.__)({ phrase: err.message, locale: 'es' })));
    return findUser;
};
/**
 * Resets password for a given token
 * @param {string} token Token to reset password
 * @param {string} password New password
 * @returns {User} data of the updated user
 */
const resetPassword = async (token, password) => {
    if ((0, util_1.isEmpty)(token))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Token is required', locale: 'es' }));
    if ((0, util_1.isEmpty)(password))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Password is required', locale: 'es' }));
    const tokenData = (0, exports.verifyToken)(token);
    if (!tokenData)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Invalid token', locale: 'es' }));
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const findUser = await user.findOneAndUpdate({ _id: tokenData._id }, { password: hashedPassword, validado: 'Validado' }, { new: true });
    if (!findUser)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'User not found', locale: 'es' }));
    return findUser;
};
const createToken = (user, expiresIn = "2 days") => {
    const dataStoredInToken = { _id: user._id }; // user._id, [organizationId, resources]
    const secretKey = index_1.keys.secretKey;
    return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secretKey, { expiresIn }) };
};
exports.createToken = createToken;
const verifyToken = (token, ignoreExpiration = false) => {
    const secretKey = index_1.keys.secretKey;
    return jsonwebtoken_1.default.verify(token, secretKey, { ignoreExpiration });
};
exports.verifyToken = verifyToken;
const createCookie = (tokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
exports.createCookie = createCookie;
exports.default = {
    signup,
    resendVerification,
    login,
    logout,
    verifyUserEmail,
    forgotPassword,
    resetPassword,
    createToken: exports.createToken,
    verifyToken: exports.verifyToken,
    createCookie: exports.createCookie
};
//# sourceMappingURL=auth.service.js.map