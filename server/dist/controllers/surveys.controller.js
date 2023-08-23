"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const surveys_services_1 = (0, tslib_1.__importDefault)(require("../services/surveys.services"));
const createSurvey = async (req, res, next) => {
    console.log(req.body);
    try {
        const survey = await surveys_services_1.default.createSurvey(req.body);
        res.status(200).json({ data: survey, message: 'survey created' });
    }
    catch (error) {
        next(error);
    }
};
const editSurvey = async (req, res, next) => {
    console.log(req.body);
    try {
        const survey = await surveys_services_1.default.editSurvey(req.body);
        res.status(200).json({ data: survey, message: 'survey edited' });
    }
    catch (error) {
        next(error);
    }
};
const getSurveys = async (req, res, next) => {
    try {
        const surveys = await surveys_services_1.default.getSurveys();
        res.status(200).json({ data: surveys, message: 'surveys list' });
    }
    catch (error) {
        next(error);
    }
};
const getSurveysByAdmins = async (req, res, next) => {
    const { organizationId } = req.body;
    try {
        const surveys = await surveys_services_1.default.getSurveysByAdmins(organizationId);
        res.status(200).json({ data: surveys, message: 'surveys list' });
    }
    catch (error) {
        next(error);
    }
};
const getSurveyById = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const survey = await surveys_services_1.default.getSurveyById(_id);
        res.status(200).json({ data: survey, message: 'survey founded' });
    }
    catch (error) {
        next(error);
    }
};
const getSurveyByOrganizationId = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const surveys = await surveys_services_1.default.getSurveyByOrganizationId(_id);
        res.status(200).json({ data: surveys, message: 'surveys founded' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    createSurvey,
    editSurvey,
    getSurveys,
    getSurveysByAdmins,
    getSurveyById,
    getSurveyByOrganizationId
};
//# sourceMappingURL=surveys.controller.js.map