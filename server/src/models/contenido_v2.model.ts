import { Contenido } from '@/interfaces/contenido.interface'
import { model, Schema, Document } from 'mongoose'

const contenidoV2Schema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'Niveles'
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
    },
    {
        timestamps: true,
        id: false
    }
)

const contenidoV2Model = model<Contenido & Document>('ContenidoV2', contenidoV2Schema)

export default contenidoV2Model