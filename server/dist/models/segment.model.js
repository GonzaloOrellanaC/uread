"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const segmentSchema = new mongoose_1.Schema({
    unit: {
        type: Number
    },
    inspectFrequency: {
        type: String
    },
    areaDensity: {
        type: Number
    },
    typeAreaDensity: {
        type: String
    },
    landUse: {
        type: String
    },
    trajectoryState: {
        type: Boolean,
        default: false
    },
    /* trajectory: [

    ], */
    state: {
        type: Boolean,
        default: true
    },
    personInCharge: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    supervisor: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    operator: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, {
    timestamps: true,
    id: false
});
const segmentModel = (0, mongoose_1.model)('Segment', segmentSchema);
exports.default = segmentModel;
//# sourceMappingURL=segment.model.js.map