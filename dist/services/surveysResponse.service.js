"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const surveyResponse_model_1 = (0, tslib_1.__importDefault)(require("../models/surveyResponse.model"));
const surveysResponse = surveyResponse_model_1.default;
const createSurveyResponse = async (srvResponse) => {
    try {
        const surveyResponse = await surveysResponse.create(srvResponse);
        return surveyResponse;
    }
    catch (error) {
    }
};
const getSurveyResponseBySurveyId = async (_id, userId) => {
    console.log(_id, userId);
    try {
        const surveyResponse = await surveysResponse.findOne({ survey: _id, createdBy: userId });
        return surveyResponse;
    }
    catch (error) {
    }
};
const getSurveyDataBySurveyId = async (_id) => {
    try {
        const surveyResponse = await surveysResponse.find({ survey: _id });
        return surveyResponse;
    }
    catch (error) {
    }
};
exports.default = {
    createSurveyResponse,
    getSurveyResponseBySurveyId,
    getSurveyDataBySurveyId
};
//# sourceMappingURL=surveysResponse.service.js.map