import { model, Schema, Document } from 'mongoose'
import { User } from '@interfaces/users.interface'

const userSchema: Schema = new Schema(
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
        run: {
            type: String,
            required: false
        },
        phone: {
            type: String
        },
        direction: {
            type: String
        },
        region: {
            type: String
        },
        city: {
            type: String
        },
        nacionality: {
            type: String
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email exist']
        },
        password: {
            type: String,
            required: false
        },
        emailVerifiedAt: {
            type: Date,
            default: null,
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
        premium: {
            type: Boolean,
            default: false
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role'
            }
        ],
        organization: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Organization'
            }
        ],
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        alumnos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Alumno'
            }
        ],
        plan: {
            type: Schema.Types.String
        },
        medioPago: {
            type: Schema.Types.String
        },
        validado: {
            type: Schema.Types.String,
            default: 'No validado'
        },
        apoderado: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        estadoPago: {
            type: Schema.Types.String,
            default: 'ok'
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

const userModel = model<User & Document>('User', userSchema)

export default userModel
