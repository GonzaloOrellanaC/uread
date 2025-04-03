"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nivelesSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    }
}, {
    timestamps: true,
    id: false
});
const nivelesModel = (0, mongoose_1.model)('Level', nivelesSchema);
exports.default = nivelesModel;
//# sourceMappingURL=niveles.model.js.map