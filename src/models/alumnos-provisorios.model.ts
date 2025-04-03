import { model, Schema, Document } from 'mongoose'

const alumnoProvisorioSchema: Schema = new Schema(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'Level'
        },
        plan: {
            type: String,
            required: [true, 'No plan selected']
        },
        medioPago: {
            type: Schema.Types.String
        },
        apoderado: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        permiteValidar: {
            type: Boolean,
            default: false
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

const alumnoProvisorioModel = model<Document>('Alumno', alumnoProvisorioSchema)

export default alumnoProvisorioModel
