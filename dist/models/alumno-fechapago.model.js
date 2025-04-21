"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alumnoFechaPagoSchema = new mongoose_1.Schema({
    alumno: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    fechaInicio: {
        type: Date
    },
    fechasPago: [
        {
            type: Date
        }
    ],
    fechasPagadas: [
        {
            type: Date
        }
    ]
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const alumnoFechaPagoModel = (0, mongoose_1.model)('AlumnoFechaPago', alumnoFechaPagoSchema);
exports.default = alumnoFechaPagoModel;
//# sourceMappingURL=alumno-fechapago.model.js.map