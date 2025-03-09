"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contractSchema = new mongoose_1.Schema({
    init: {
        type: Date
    },
    finish: {
        type: Date
    },
    contractDescription: {
        type: String
    },
    projects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
}, {
    timestamps: true,
    id: false
});
const contractModel = (0, mongoose_1.model)('Contract', contractSchema);
exports.default = contractModel;
//# sourceMappingURL=contract.model.js.map