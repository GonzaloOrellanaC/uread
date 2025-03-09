"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const surveyResponseSchema = new mongoose_1.Schema({
    survey: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Question'
    },
    responses: [
        {
            type: Object
        }
    ],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    id: false
});
const surveyResponseModel = (0, mongoose_1.model)('SurveyResponse', surveyResponseSchema);
exports.default = surveyResponseModel;
//# sourceMappingURL=surveyResponse.model.js.map