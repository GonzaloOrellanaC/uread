import { Organization } from '@/interfaces/roles.interface'
import { model, Schema, Document } from 'mongoose'

const organizationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        description: {
            type: String
        },
        state: {
            type: Boolean,
            default: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        contracts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contract'
            }
        ],
        imageBgLoginUrl: [
            {
                type: String
            }
        ],
        themes: [
            {
                type: String
            }
        ],
        idOrg: {
            type: Number
        },
        logoUrl: {
            type: String
        },
        phone: {
            type: String
        },
        nation: {
            type: String
        },
        email: {
            type: String
        },
        region: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String
        },
        coords: {
            type: Object
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const organizationModel = model<Organization & Document>('Organization', organizationSchema)

export default organizationModel
