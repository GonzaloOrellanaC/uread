"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = require("../configs/env");
const users_service_1 = (0, tslib_1.__importDefault)(require("../services/users.service"));
const organizations_model_1 = (0, tslib_1.__importDefault)(require("../models/organizations.model"));
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
        const updateUserData = await users_service_1.default.editUser(userData);
        res.status(200).json({ data: updateUserData, message: 'updated' });
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
exports.default = {
    getUsers,
    getAdminUsers,
    getUserById,
    getAllSystemUser,
    getUsersByOrg,
    createAdminSysUser,
    createUser,
    editUser,
    deleteUser
};
//# sourceMappingURL=users.controller.js.map