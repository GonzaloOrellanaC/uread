import { model, Schema, Document } from 'mongoose'

const calendarSchema = new Schema(
    {
        date: {
            type: Schema.Types.Date
        },
        title: {
            type: Schema.Types.String
        },
        description: {
            type: Schema.Types.String
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        teachers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        state: {
            type: Schema.Types.Boolean
        },
        urlMeeting: {
            type: Schema.Types.String
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const calendarModel = model<Document>('Calendar', calendarSchema)

export default calendarModel