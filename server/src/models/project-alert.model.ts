import { ProjectAlert } from '@/interfaces/project.interface'
import { model, Schema, Document } from 'mongoose'

const projectAlertSchema = new Schema(
    {
        category: {
            type: String
        },
        distanceToAsset: {
            type: Number
        },
        riskLevel: {
            type: Number
        },
        state: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const projectAlertModel = model<ProjectAlert & Document>('ProjectAlert', projectAlertSchema)

export default projectAlertModel