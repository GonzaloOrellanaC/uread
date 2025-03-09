import { Project } from '@/interfaces/project.interface'
import { model, Schema, Document } from 'mongoose'

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            unique: false
        },
        typeProduct: {
            type: String,
            required: [true, 'Type product is required'],
            unique: false
        },
        state: {
            type: Boolean,
            default: true
        }/* ,
        segments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Segment'
            }
        ],
        criticalityAlerts : [
            {
                type: Schema.Types.ObjectId,
                ref: 'ProjectAlert'
            }
        ] */
    },
    {
        timestamps: true,
        id: false
    }
)

const projectModel = model<Project & Document>('Project', projectSchema)

export default projectModel
