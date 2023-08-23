"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const preUserSchema = new mongoose_1.Schema({
    idPreUser: {
        type: Number
    },
    name: {
        type: String,
        required: false
    },
    run: {
        type: String,
        required: [true, 'Run is required'],
        unique: true
    },
    activated: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const preUserModel = (0, mongoose_1.model)('PreUser', preUserSchema);
exports.default = preUserModel;
//# sourceMappingURL=pre-users.model.js.map