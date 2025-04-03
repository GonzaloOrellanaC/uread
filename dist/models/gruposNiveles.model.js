"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gruposNivelesSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    index: {
        type: Number
    },
    cursos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Level"
        }
    ]
}, {
    timestamps: true,
    id: false
});
const gruposNivelesModel = (0, mongoose_1.model)('GruposNiveles', gruposNivelesSchema);
exports.default = gruposNivelesModel;
//# sourceMappingURL=gruposNiveles.model.js.map