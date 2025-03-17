"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classroomSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    url: {
        type: String
    },
    planes: [
        {
            type: Object
        }
    ],
    niveles: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true,
    id: false
});
const classroomModel = (0, mongoose_1.model)('classroom', classroomSchema);
exports.default = classroomModel;
//# sourceMappingURL=classroom.model.js.map