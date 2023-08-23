import { ListaLenguajes } from '@/interfaces/contenido.interface'
import lenguajeModel from '@/models/lenguaje.model'

const lenguaje = lenguajeModel

const leerContenidos = async () => {
    const lenguajesResponse: ListaLenguajes[] = await lenguaje.find()
    return lenguajesResponse
}

export default {
    leerContenidos
}