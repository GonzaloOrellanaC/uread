"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alumnoProvisorioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    secondLastName: {
        type: String,
        required: false
    },
    state: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String,
        required: false
    },
    levelUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Niveles'
    },
    plan: {
        type: String,
        required: [true, 'No plan selected']
    },
    medioPago: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const alumnoProvisorioModel = (0, mongoose_1.model)('Alumno', alumnoProvisorioSchema);
exports.default = alumnoProvisorioModel;
//# sourceMappingURL=alumnos-provisorios.model.js.map