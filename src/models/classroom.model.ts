import { model, Schema, Document } from 'mongoose'

const classroomSchema = new Schema(
    {
        name: {
            type: String
        },
        url: {
            type: String
        },

        planes: [
            {
                type: Object
            }
        ],
        niveles: [
            {
                type: Object
            }
        ]
    },
    {
        timestamps: true,
        id: false
    }
)

const classroomModel = model<Document>('classroom', classroomSchema)

export default classroomModel