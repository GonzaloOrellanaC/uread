import { SurveyResponse } from '@/interfaces/survey.interface'
import { model, Schema, Document } from 'mongoose'

const surveyResponseSchema = new Schema(
    {
        survey: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        responses: [
            {
                type: Object
            }
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const surveyResponseModel = model<SurveyResponse & Document>('SurveyResponse', surveyResponseSchema)

export default surveyResponseModel