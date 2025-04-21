import { model, Schema, Document } from 'mongoose'

const alumnoFechaPagoSchema: Schema = new Schema(
    {
        alumno: {
            type: Schema.Types.ObjectId,
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

const alumnoFechaPagoModel = model<Document>('AlumnoFechaPago', alumnoFechaPagoSchema)

export default alumnoFechaPagoModel