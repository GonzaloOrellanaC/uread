"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const accesscontrol_1 = require("accesscontrol");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const i18n_1 = require("i18n");
const users_model_1 = (0, tslib_1.__importDefault)(require("../models/users.model"));
const util_1 = require("../utils/util");
const configs_1 = require("../configs");
const HttpException_1 = require("../exceptions/HttpException");
const roles_model_1 = (0, tslib_1.__importDefault)(require("../models/roles.model"));
const roles_config_1 = require("../configs/roles.config");
const ac = new accesscontrol_1.AccessControl();
const initAccessControl = async () => {
    try {
        const findRole = await roles_model_1.default.findOne({ name: roles_config_1.superAdmin.name });
        let adminResult = '';
        if (!findRole) {
            await createRole(roles_config_1.superAdmin);
            await createRole(roles_config_1.admin);
            await createRole(roles_config_1.user);
            adminResult = 'Super admin Role created';
        }
        console.info(`Initialized access control. ${adminResult}`);
    }
    catch (error) {
        console.error(error);
    }
};
const createRole = async (role) => {
    try {
        const newRole = new roles_model_1.default({
            name: role.name,
        });
        await newRole.save();
        return newRole;
    }
    catch (error) {
        // Add error message to be sent
        throw new Error(error.message);
    }
};
/* const createRole = async (
    roleInfo: CreateRoleDto,
    org: string,
    rolesMatchs: boolean,
    locale: string = env.locale
): Promise<Role> => {
    if (rolesMatchs) {
        const organizationFound = await organizationModel.findById(org)
        try {
            const newRole = RoleModel.create({
                name: roleInfo.name,
                organizationId: org,
                resources: roleInfo.resources,
                description: roleInfo.description
            })
            await updateAccessControl()
            return newRole
        } catch (error) {
            if (organizationFound) {
                throw new HttpException(
                    409,
                    __(
                        { phrase: 'Role {{role}} already exists for organization {{organization}}', locale },
                        { role: roleInfo.name, organization: organizationFound.name }
                    )
                )
            } else {
                throw new HttpException(409, __({ phrase: 'Could not find organization', locale }))
            }
        }
    } else throw new HttpException(409, __({ phrase: 'You do not have permission to create that role', locale }))
} */
const createGlobalRole = async (roleInfo, rolesMatchs, locale = configs_1.env.locale) => {
    if (rolesMatchs) {
        try {
            const newRole = roles_model_1.default.create({
                name: roleInfo.name,
                resources: roleInfo.resources,
                description: roleInfo.description
            });
            await updateAccessControl();
            return newRole;
        }
        catch (error) {
            throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Role already exists', locale }));
        }
    }
    else
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'You do not have permission to create that role', locale }));
};
const updateSuperAdmin = async (roleId, newResources) => {
    try {
        const updated = await roles_model_1.default.findByIdAndUpdate(roleId, { resources: newResources }, { new: true });
        if (!updated) {
            throw new Error();
        }
        await updateAccessControl();
        return updated;
    }
    catch (error) {
        // Add error message to be sent
        throw new Error(error.message);
    }
};
const createRoleAdmin = async (roleInfo) => {
    try {
        const findAdmin = await users_model_1.default.findOne({ email: configs_1.env.email });
        const newRole = new roles_model_1.default({
            name: roleInfo.name,
            resources: roleInfo.resources,
        });
        await newRole.save();
        findAdmin.roles.push(newRole._id);
        findAdmin.save();
        await updateAccessControl();
        return newRole;
    }
    catch (error) {
        // Add error message to be sent
        throw new Error(error.message);
    }
};
const createRoleSeller = async (roleInfo) => {
    try {
        const newRole = new roles_model_1.default({
            name: roleInfo.name,
            resources: roleInfo.resources
        });
        await newRole.save();
        await updateAccessControl();
        return newRole;
    }
    catch (error) {
        // Add error message to be sent
        throw new Error(error.message);
    }
};
const updateAccessControl = async () => {
    const parsedRoles = {};
    ac.setGrants(parsedRoles);
    return 'Access Control updated';
};
const check = (role, resource, type) => {
    const typeResponses = {
        createAny: ac.can(role.toString()).createAny(resource),
        readAny: ac.can(role.toString()).readAny(resource),
        updateAny: ac.can(role.toString()).updateAny(resource),
        deleteAny: ac.can(role.toString()).deleteAny(resource),
        createOwn: ac.can(role.toString()).createOwn(resource),
        readOwn: ac.can(role.toString()).readOwn(resource),
        updateOwn: ac.can(role.toString()).updateOwn(resource),
        deleteOwn: ac.can(role.toString()).deleteOwn(resource)
    };
    console.log(typeResponses);
    if (!Object.keys(typeResponses).includes(type))
        return ac.can(role.toString()).readAny('NONRESOURCE');
    return typeResponses[type];
};
const createSuperAdmin = async () => {
    const hashedPassword = await bcrypt_1.default.hash(configs_1.env.password, 10);
    const user = await users_model_1.default.findOneAndUpdate({ email: configs_1.env.email }, {
        $setOnInsert: Object.assign(Object.assign({ name: configs_1.env.name }, (!(0, util_1.isEmpty)(configs_1.env.lastName) && { lastName: configs_1.env.lastName })), { email: configs_1.env.email, run: configs_1.env.run, password: hashedPassword, state: true, idUser: 1 })
    }, { new: true, upsert: true });
    return user;
};
const updateRole = async (roleInfo, locale = configs_1.env.locale) => {
    const updated = await roles_model_1.default.findByIdAndUpdate(roleInfo._id, {
        name: roleInfo.name,
        /* resources: roleInfo.resources,
        description: roleInfo.description */
    }, { new: true });
    if (!updated)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Role not found', locale }));
    await updateAccessControl();
    return updated;
};
const deleteRole = async (roleId, locale = configs_1.env.locale) => {
    const deleted = await roles_model_1.default.findByIdAndDelete(roleId);
    if (!deleted)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Role not found', locale }));
    await updateAccessControl();
    return deleted;
};
const findRolesByOrg = async (orgId) => {
    const roles = await roles_model_1.default.find({ organizationId: orgId });
    return roles;
};
const findRolesAdmin = async () => {
    const roles = await roles_model_1.default.find({ $or: [{ name: 'SuperAdmin' }, { name: 'seller' }] });
    return roles;
};
const findAllRoles = async () => {
    const roles = await roles_model_1.default.find();
    return roles;
};
const updateRoleById = async (roleId, roleData, locale = configs_1.env.locale) => {
    const updated = await roles_model_1.default.findByIdAndUpdate(roleId, roleData, { new: true });
    if (!updated)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Role not found', locale }));
    await updateAccessControl();
    return updated;
};
exports.default = {
    ac,
    check,
    createSuperAdmin,
    initAccessControl,
    updateAccessControl,
    createRole,
    createGlobalRole,
    updateRole,
    deleteRole,
    findRolesByOrg,
    findRolesAdmin,
    findAllRoles,
    updateRoleById
};
//# sourceMappingURL=accessControl.service.js.map