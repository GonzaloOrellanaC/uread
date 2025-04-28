"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const roles_controller_1 = tslib_1.__importDefault(require("../controllers/roles.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const roles_dto_1 = require("../dtos/roles.dto");
const router = (0, express_1.Router)();
router.post(`/createRole/organization/:organizationId`, 
/* authMiddleware, */
(0, permission_middleware_1.grantAccess)('createAny', 'RolePermission'), (0, validation_middleware_1.default)(roles_dto_1.CreateRoleDto, 'body', true), roles_controller_1.default.createRole);
router.post(`/createGlobalRole/`, 
/* authMiddleware, */
permission_middleware_1.superAdminAccess, (0, validation_middleware_1.default)(roles_dto_1.CreateGlobalRoleDto, 'body', true), roles_controller_1.default.createGlobalRole);
router.put(`/update/role/:roleId`, 
/* authMiddleware, */
(0, permission_middleware_1.grantAccess)('updateAny', 'RolePermission'), (0, validation_middleware_1.default)(roles_dto_1.UpdateRoleDto, 'body', true), roles_controller_1.default.updateRole);
router.get(`/getRolesAdmin`, 
/* authMiddleware, */
roles_controller_1.default.getRolesAdmin);
router.post(`/getRolesById/organization`, 
/* /* authMiddleware, */
/* grantAccess('readAny', 'RolePermission'), */
roles_controller_1.default.getRolesByOrg);
router.get(`/getRoles`, /* authMiddleware, */ /* superAdminAccess(), */ roles_controller_1.default.getAllRoles);
router.get(`/getMyRoles`, /* authMiddleware, */ roles_controller_1.default.getMyRoles);
router.delete(`/delete/role/:roleId`, 
/* authMiddleware, */
(0, permission_middleware_1.grantAccess)('deleteAny', 'RolePermission'), roles_controller_1.default.deleteRole);
exports.default = router;
//# sourceMappingURL=roles.route.js.map