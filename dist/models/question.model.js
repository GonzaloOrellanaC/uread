"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
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
        type: Boolean
    }
}, {
    timestamps: true,
    id: false
});
const questionModel = (0, mongoose_1.model)('Question', questionSchema);
exports.default = questionModel;
//# sourceMappingURL=question.model.js.map