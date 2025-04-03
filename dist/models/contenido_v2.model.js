"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contenidoV2Schema = new mongoose_1.Schema({
    idSurvey: {
        type: Number
    },
    nombreTexto: {
        type: String
    },
    descripcion: {
        type: String
    },
    audioEnUrl: {
        type: String
    },
    audioEsUrl: {
        type: String
    },
    imageUrl: [
        {
            url: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    relator: {
        type: String
    },
    lenguajes: [
        {
            lenguaje: {
                type: String
            },
            listaTexto: {
                type: Array
            },
            urlAudio: {
                type: String
            },
            contenido: {
                type: Object
            },
            transcripcion: {
                type: Object
            }
        }
    ],
    createdBy: {
        type: String
        /* type: Schema.Types.ObjectId,
        ref: 'User' */
    },
    updatedBy: {
        type: String
        /* type: Schema.Types.ObjectId,
        ref: 'User' */
    },
    state: {
        type: Boolean,
        default: true
    },
    nivel: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Level'
    },
    pdf: [
        {
            pdfUrl: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    isTesting: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    id: false
});
const contenidoV2Model = (0, mongoose_1.model)('ContenidoV2', contenidoV2Schema);
exports.default = contenidoV2Model;
//# sourceMappingURL=contenido_v2.model.js.map