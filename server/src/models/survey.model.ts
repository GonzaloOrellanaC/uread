import { Survey } from '@/interfaces/survey.interface'
import { model, Schema, Document } from 'mongoose'

const surveySchema = new Schema(
    {
        idSurvey: {
            type: Number
        },
        description: {
            type: String
        },
        organization: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Organization',
                required: [true, 'Org requiered']
            }
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
        questions: [
            {
                description: {
                    type: String
                },
                alternatives: [
                    {
                        description: {
                            type: String
                        }
                    }
                ],
                multiple: {
                    type: Boolean,
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true,
        id: false
    }
)

const surveyModel = model<Survey & Document>('Survey', surveySchema)

export default surveyModel