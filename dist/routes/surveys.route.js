"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
/* import authMiddleware from '../middlewares/auth.middleware' */
const surveys_controller_1 = tslib_1.__importDefault(require("../controllers/surveys.controller"));
const router = (0, express_1.Router)();
router.post(`/createSurvey`, /* authMiddleware, */ surveys_controller_1.default.createSurvey);
router.post(`/editSurvey`, /* authMiddleware, */ surveys_controller_1.default.editSurvey);
router.get(`/getSurveys`, /* authMiddleware, */ surveys_controller_1.default.getSurveys);
router.post(`/getSurveysByAdmins`, /* authMiddleware, */ surveys_controller_1.default.getSurveysByAdmins);
router.post(`/getSurveyById`, /* authMiddleware, */ surveys_controller_1.default.getSurveyById);
router.post(`/getSurveyByOrganizationId`, /* authMiddleware, */ surveys_controller_1.default.getSurveyByOrganizationId);
exports.default = router;
//# sourceMappingURL=surveys.route.js.map