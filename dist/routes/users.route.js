"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const users_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/users.controller"));
/* import authMiddleware from '../middlewares/auth.middleware' */
const router = (0, express_1.Router)();
router.post(`/createAdminSysUser`, /* authMiddleware, */ users_controller_1.default.createAdminSysUser);
router.post(`/createUser`, /* authMiddleware, */ users_controller_1.default.createUser);
router.post(`/editUser`, /* authMiddleware, */ users_controller_1.default.editUser);
router.post(`/getUserById`, /* authMiddleware, */ users_controller_1.default.getUserById);
router.post(`/deleteUser`, /* authMiddleware, */ users_controller_1.default.deleteUser);
router.get(`/getUsers`, /* authMiddleware, */ users_controller_1.default.getUsers);
router.get(`/getAdminUsers`, /* authMiddleware, */ users_controller_1.default.getAdminUsers);
router.get('/getAllSystemUser', /* authMiddleware, */ users_controller_1.default.getAllSystemUser);
router.post('/getUsersByOrg', /* authMiddleware, */ users_controller_1.default.getUsersByOrg);
router.post('/validarUsuario', /* authMiddleware, */ users_controller_1.default.validarUsuario);
router.post('/habilitarUsuarioDesdeAlumno', /* authMiddleware, */ users_controller_1.default.habilitarUsuarioDesdeAlumno);
router.post('/cambiar-password', users_controller_1.default.cambiarPassword);
exports.default = router;
//# sourceMappingURL=users.route.js.map