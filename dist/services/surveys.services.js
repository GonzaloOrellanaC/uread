"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const survey_model_1 = (0, tslib_1.__importDefault)(require("../models/survey.model"));
const surveys = survey_model_1.default;
const createSurvey = async (srv) => {
    const surveysTotal = await surveys.find();
    srv.idSurvey = surveysTotal.length + 1;
    try {
        const survey = await surveys.create(srv);
        return survey;
    }
    catch (error) {
    }
};
const editSurvey = async (srv) => {
    try {
        const survey = await surveys.findByIdAndUpdate(srv._id, srv);
        return survey;
    }
    catch (error) {
    }
};
const getSurveys = async () => {
    try {
        const survey = await surveys.find().populate('users').populate('organization').populate('createdBy').populate('updatedBy');
        return survey;
    }
    catch (error) {
    }
};
const getSurveysByAdmins = async (organizationId) => {
    console.log('Desde un admin por organización');
    try {
        const survey = await surveys.find({ organization: { $in: [{ _id: organizationId }] } }).populate('users').populate('organization').populate('createdBy').populate('updatedBy');
        return survey;
    }
    catch (error) {
    }
};
const getSurveyById = async (_id) => {
    try {
        const survey = await surveys.findById({ _id: _id }).populate('users') /* .populate('organization') */.populate('createdBy').populate('updatedBy');
        return survey;
    }
    catch (error) {
    }
};
const getSurveyByOrganizationId = async (_id) => {
    try {
        const survey = await surveys.find({ organization: { $all: [_id] } }).populate('users');
        return survey;
    }
    catch (error) {
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
//# sourceMappingURL=surveys.services.js.map