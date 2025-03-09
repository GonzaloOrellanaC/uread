"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
/* import authMiddleware from '../middlewares/auth.middleware' */
const surveysResponse_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/surveysResponse.controller"));
const router = (0, express_1.Router)();
router.post(`/saveSurveyResponse`, /* authMiddleware, */ surveysResponse_controller_1.default.createSurveysResponse);
router.post(`/getSurveyResponseBySurveyId`, /* authMiddleware, */ surveysResponse_controller_1.default.getSurveyResponseBySurveyId);
router.post(`/getSurveyDataBySurveyId`, /* authMiddleware, */ surveysResponse_controller_1.default.getSurveyDataBySurveyId);
exports.default = router;
//# sourceMappingURL=surveys-response.route.js.map