"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminAccess = exports.grantAccess = void 0;
const HttpException_1 = require("../exceptions/HttpException");
/**
 * Middleware that grants or deny access
 * @param  {string=null} action action to perform
 * @param  {string=null} resource resource to access
 */
const grantAccess = function (action = null, resource = null) {
    return async (req, res, next) => {
        // Check if the user has at least one role
        if (!Array.isArray(req.user.roles) || !req.user.roles.length) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
        // Check if the user has a global Role
        /*  const globalRoleFound: Role = req.user.roles.find(role => {
             return !role.organizationId
         })
         // If the use has a global role check if it has permission
         if (globalRoleFound) {
             if (globalRoleFound.name === superAdmin.name) {
                 req.role = globalRoleFound
                 return next()
             }
             console.log(globalRoleFound._id, resource, action)
             const permission = AccessControlServices.check(globalRoleFound._id, resource, action)
             console.log(permission)
             if (permission.granted) {
                 req.role = globalRoleFound
                 return next()
             }
         } */
        try {
            /* let org = req.params.organizationId
            // if there is no organization in the request, search for role in request
            // and query the role, to get organization
            if (!org) {
                const roleId = req.params.roleId || req.body._id
                console.log(roleId)
                if (roleId) {
                    const findRoleData: Role = await roleModel.findById(roleId, 'organizationId')
                    org = findRoleData.organizationId.toString()
                }
            }
            // search if the user has a role that is assigned to the organization to make an action
            const roleFound = req.user.roles.find(obj => {
                if (obj.organizationId && org === obj.organizationId.toString()) {
                    return obj.organizationId
                } else return null
            })
            // if the user has a role that match an organization then check if it has permission
            if (roleFound) {
                const permission = AccessControlServices.check(roleFound._id, resource, action)
                if (!permission.granted) {
                    return next(new HttpException(401, 'You do not have enough permission to perform this action'))
                }
            } else {
                return next(new HttpException(401, 'You do not have enough permission to perform this action'))
            }
            req.role = roleFound
            return next() */
        }
        catch (_a) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
    };
};
exports.grantAccess = grantAccess;
/**
 * Middleware that grants or deny access if the user is super admin
 */
const superAdminAccess = function () {
    return async (req, res, next) => {
        if (!Array.isArray(req.user.roles) || !req.user.roles.length)
            next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        try {
            /* const superAdminFound: Role = req.user.roles.find(role => {
                return role.name === superAdmin.name && !role.organizationId
            })
            if (superAdminFound) {
                next()
                req.role = superAdminFound
                return
            } else {
                return next(new HttpException(401, 'You do not have enough permission to perform this action'))
            } */
        }
        catch (error) {
            return next(new HttpException_1.HttpException(401, 'You do not have enough permission to perform this action'));
        }
    };
};
exports.superAdminAccess = superAdminAccess;
//# sourceMappingURL=permission.middleware.js.map