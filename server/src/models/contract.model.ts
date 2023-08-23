import { Contract } from '@/interfaces/roles.interface'
import { model, Schema, Document } from 'mongoose'

const contractSchema = new Schema(
    {
        init: {
            type: Date
        },
        finish: {
            type: Date
        },
        contractDescription: {
            type: String
        },
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            }
        ]
    },
    {
        timestamps: true,
        id: false
    }
)

const contractModel = model<Contract & Document>('Contract', contractSchema)

export default contractModel