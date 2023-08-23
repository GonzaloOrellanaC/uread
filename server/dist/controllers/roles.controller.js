"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const accessControl_service_1 = (0, tslib_1.__importDefault)(require("../services/accessControl.service"));
/**
 * Creates a new Role for an existing organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createRole = async (req, res, next) => {
    try {
        /*         const rolesMatchs = Object.keys(req.body.resources).every(key => {
                    return Object.keys(req.role.resources).includes(key)
                }) */
        const roleInfo = req.body;
        const newRole = await accessControl_service_1.default.createRole(roleInfo);
        res.status(201).json({ data: newRole, message: 'created' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Creates a global role (a global role is not assigned to an organization)
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const createGlobalRole = async (req, res, next) => {
    /* try {
        const rolesMatchs = Object.keys(req.body.resources).every(key => {
            return Object.keys(req.role.resources).includes(key)
        })

        const roleInfo: CreateRoleDto = req.body
        const newRole = await AccessControlServices.createGlobalRole(roleInfo, rolesMatchs)
        res.status(201).json({ data: newRole, message: 'created' })
    } catch (error) {
        next(error)
    } */
};
/**
 * Get roles assigned to a specific organization
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getRolesByOrg = async (req, res, next) => {
    try {
        const findAllRoles = await accessControl_service_1.default.findRolesByOrg(req.body.organizationId);
        res.status(200).json({ data: findAllRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
const getRolesAdmin = async (req, res, next) => {
    try {
        const findAllRoles = await accessControl_service_1.default.findRolesAdmin();
        res.status(200).json({ data: findAllRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get all existing roles in the database
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getAllRoles = async (req, res, next) => {
    try {
        const findAllRoles = await accessControl_service_1.default.findAllRoles();
        res.status(200).json({ data: findAllRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Get the roles of the user
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const getMyRoles = async (req, res, next) => {
    try {
        const findMyRoles = req.user.roles;
        res.status(200).json({ data: findMyRoles, message: 'findRoles' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Updates a specific role
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const updateRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const roleData = req.body;
        const updatedRole = await accessControl_service_1.default.updateRoleById(roleId, roleData);
        res.status(200).json({ data: updatedRole, message: 'updated' });
    }
    catch (error) {
        next(error);
    }
};
/**
 * Delete a specific role
 * @param  {Request} req http request arguments
 * @param  {Response} res http response arguments
 * @param  {NextFunction} next next matching route
 */
const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;
        const deletedRole = await accessControl_service_1.default.deleteRole(roleId);
        res.status(200).json({ data: deletedRole, message: 'deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = { createRole, getRolesByOrg, getRolesAdmin, getAllRoles, updateRole, deleteRole, createGlobalRole, getMyRoles };
//# sourceMappingURL=roles.controller.js.map