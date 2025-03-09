import { Segment } from '@/interfaces/project.interface'
import { model, Schema, Document } from 'mongoose'

const segmentSchema = new Schema(
    {
        unit: {
            type: Number
        },
        inspectFrequency: {
            type: String
        },
        areaDensity: {
            type: Number
        },
        typeAreaDensity: {
            type: String
        },
        landUse: {
            type: String
        },
        trajectoryState: {
            type: Boolean,
            default: false
        },
        /* trajectory: [

        ], */
        state: {
            type: Boolean,
            default: true
        },
        personInCharge: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        supervisor: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        operator: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        timestamps: true,
        id: false
    }
)

const segmentModel = model<Segment & Document>('Segment', segmentSchema)

export default segmentModel