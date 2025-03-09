"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const surveySchema = new mongoose_1.Schema({
    idSurvey: {
        type: Number
    },
    description: {
        type: String
    },
    organization: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Organization',
            required: [true, 'Org requiered']
        }
    ],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: Boolean,
        default: true
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    questions: [
        {
            description: {
                type: String
            },
            alternatives: [
                {
                    description: {
                        type: String
                    }
                }
            ],
            multiple: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true,
    id: false
});
const surveyModel = (0, mongoose_1.model)('Survey', surveySchema);
exports.default = surveyModel;
//# sourceMappingURL=survey.model.js.map