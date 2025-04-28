import { model, Schema, Document } from 'mongoose'

const notificacionesSchema: Schema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            data: Object
        }
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

const notificacionesModel = model<Document>('Notificaciones', notificacionesSchema)

export default notificacionesModel