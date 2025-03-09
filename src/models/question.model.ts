import { Question } from '@/interfaces/survey.interface'
import { model, Schema, Document } from 'mongoose'

const questionSchema = new Schema(
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
            type: Boolean
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const questionModel = model<Question & Document>('Question', questionSchema)

export default questionModel