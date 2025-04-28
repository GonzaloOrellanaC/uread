"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post(`/signup`, auth_controller_1.default.signUp);
router.post(`/login`, auth_controller_1.default.logIn);
router.post(`/logout`, auth_controller_1.default.logOut);
router.post(`/verify`, auth_controller_1.default.verifyUserEmail);
router.post(`/resendVerification`, auth_controller_1.default.resendVerification);
router.post(`/forgot-password`, auth_controller_1.default.forgotPassword);
router.post(`/reset-password`, auth_controller_1.default.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map