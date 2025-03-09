"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lenguajeSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    language: {
        type: String
    }
}, {
    timestamps: true,
    id: false
});
const lenguajeModel = (0, mongoose_1.model)('Languages', lenguajeSchema);
exports.default = lenguajeModel;
//# sourceMappingURL=lenguaje.model.js.map