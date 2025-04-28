"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificacionesSchema = new mongoose_1.Schema({
    state: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    detail: {
        type: String
    },
    longText: {
        type: String
    },
    links: [
        {
            type: String
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    viwed: {
        type: Date,
        default: null
    },
    idType: {
        type: String,
        require: [true, 'No id type']
    },
    metadata: {
        alumno: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        },
        data: Object
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
const notificacionesModel = (0, mongoose_1.model)('Notificaciones', notificacionesSchema);
exports.default = notificacionesModel;
//# sourceMappingURL=notificaciones.model.js.map