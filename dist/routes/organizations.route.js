"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const permission_middleware_1 = require("../middlewares/permission.middleware");
const organizations_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/organizations.controller"));
const router = (0, express_1.Router)();
router.post(`/createOrg`, 
/* authMiddleware, */
/* grantAccess('createAny', 'OrganizationPermission'), */
/* validationMiddleware(CreateOrgDto, 'body', true), */
organizations_controller_1.default.createOrg);
router.post(`/editOrg`, 
/* authMiddleware, */
/* grantAccess('createAny', 'OrganizationPermission'), */
/* validationMiddleware(CreateOrgDto, 'body', true), */
organizations_controller_1.default.editOrg);
router.put(`/update/organization/:organizationId`, 
/* authMiddleware, */
/* grantAccess('updateAny', 'OrganizationPermission'), */
/* validationMiddleware(UpdateOrgDto, 'body', true), */
organizations_controller_1.default.updateOrganization);
router.get(`/getOrganizations`, /* /* authMiddleware, */ /*superAdminAccess, */ organizations_controller_1.default.getAllOrgs);
router.get(`/getMyOrganizations`, /* authMiddleware, */ organizations_controller_1.default.getMyOrgs);
router.post(`/getOrgById`, /* authMiddleware, */ organizations_controller_1.default.getOrgById);
router.delete(`/delete/organization/:organizationId`, 
/* authMiddleware, */
permission_middleware_1.superAdminAccess, organizations_controller_1.default.deleteOrganization);
exports.default = router;
//# sourceMappingURL=organizations.route.js.map