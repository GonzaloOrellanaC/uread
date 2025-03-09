import { model, Schema, Document } from 'mongoose'
import { User } from '@interfaces/users.interface'
import { PreUser } from '@/interfaces/pre-users.interface'

const preUserSchema: Schema = new Schema(
    {
        idPreUser: {
            type: Number
        },
        name: {
            type: String,
            required: false
        },
        run: {
            type: String,
            required: [true, 'Run is required'],
            unique: true
        },
        activated: {
            type: Boolean,
            default: true
        },
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

const preUserModel = model<PreUser & Document>('PreUser', preUserSchema)

export default preUserModel
