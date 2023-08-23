"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        unique: false
    },
    typeProduct: {
        type: String,
        required: [true, 'Type product is required'],
        unique: false
    },
    state: {
        type: Boolean,
        default: true
    } /* ,
    segments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Segment'
        }
    ],
    criticalityAlerts : [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProjectAlert'
        }
    ] */
}, {
    timestamps: true,
    id: false
});
const projectModel = (0, mongoose_1.model)('Project', projectSchema);
exports.default = projectModel;
//# sourceMappingURL=project.model.js.map