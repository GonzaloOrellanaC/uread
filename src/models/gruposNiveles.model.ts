import { model, Schema, Document, ObjectId } from 'mongoose'

const gruposNivelesSchema = new Schema(
    {
        name: {
            type: String
        },
        index: {
            type: Number
        },
        cursos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Niveles"
            }
        ]
    },
    {
        timestamps: true,
        id: false
    }
)

const gruposNivelesModel = model<Document>('GruposNiveles', gruposNivelesSchema)

export default gruposNivelesModel