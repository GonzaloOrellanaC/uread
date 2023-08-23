"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectAlertSchema = new mongoose_1.Schema({
    category: {
        type: String
    },
    distanceToAsset: {
        type: Number
    },
    riskLevel: {
        type: Number
    },
    state: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    id: false
});
const projectAlertModel = (0, mongoose_1.model)('ProjectAlert', projectAlertSchema);
exports.default = projectAlertModel;
//# sourceMappingURL=project-alert.model.js.map