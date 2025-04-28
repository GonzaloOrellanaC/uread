"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const surveysResponse_service_1 = tslib_1.__importDefault(require("../services/surveysResponse.service"));
const createSurveysResponse = async (req, res, next) => {
    try {
        const surveyResponse = req.body.data;
        const createSurveyResponse = await surveysResponse_service_1.default.createSurveyResponse(surveyResponse);
        res.status(201).json({ data: createSurveyResponse, state: true, message: 'created' });
    }
    catch (error) {
        next(error);
    }
};
const getSurveyResponseBySurveyId = async (req, res, next) => {
    try {
        const { _id, userId } = req.body;
        const surveyResponse = await surveysResponse_service_1.default.getSurveyResponseBySurveyId(_id, userId);
        if (surveyResponse) {
            res.status(201).json({ data: surveyResponse, state: true, message: 'found' });
        }
        else {
            res.status(201).json({ data: surveyResponse, state: false, message: 'found' });
        }
    }
    catch (error) {
        next(error);
    }
};
const getSurveyDataBySurveyId = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const surveyResponse = await surveysResponse_service_1.default.getSurveyDataBySurveyId(_id);
        if (surveyResponse) {
            res.status(201).json({ data: surveyResponse, state: true, message: 'found' });
        }
        else {
            res.status(201).json({ data: surveyResponse, state: false, message: 'found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createSurveysResponse,
    getSurveyResponseBySurveyId,
    getSurveyDataBySurveyId
};
//# sourceMappingURL=surveysResponse.controller.js.map