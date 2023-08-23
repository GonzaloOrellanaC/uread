import { ListaLenguajes } from '@/interfaces/contenido.interface'
import { model, Schema, Document } from 'mongoose'

const lenguajeSchema = new Schema(
    {
        name: {
            type: String
        },
        language: {
            type: String
        }
    },
    {
        timestamps: true,
        id: false
    }
)

const lenguajeModel = model<ListaLenguajes & Document>('Languages', lenguajeSchema)

export default lenguajeModel