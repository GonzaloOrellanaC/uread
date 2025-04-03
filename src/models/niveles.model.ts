import { model, Schema, Document, ObjectId } from 'mongoose'

const nivelesSchema = new Schema(
    {
        name: {
            type: String
        },
        number: {
            type: Number
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const nivelesModel = model<{
    _id: ObjectId
    name: string
    number: number
} & Document>('Level', nivelesSchema)

export default nivelesModel