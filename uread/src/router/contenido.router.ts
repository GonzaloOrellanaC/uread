import axios from "axios"
import { Contenido } from "../interfaces/Contenido.interface"
import { api } from "../configuration/environments";

const crearContenido = async (contenido: Contenido) => {
    const response = await axios.post(api.url + '/api/contenido/crearContenido', contenido)
    return response.data
}

const editarContenido = async (contenido: Contenido) => {
    const response = await axios.post(api.url + '/api/contenido/editarContenidoV2', contenido)
    return response.data
}

const getContenido = async (premium: boolean) => {
    if (premium) {
        const response = await axios.get(api.url + '/api/contenido/leerContenidos')
        return response.data
    } else {
        const response = await axios.get(api.url + '/api/contenido/leerContenidosBasicos')
        return response.data
    }
}

const getContenidoV2 = async () => {
    const response = await axios.get(api.url + '/api/contenido/leerContenidosV2')
    return response.data
}

const getNiveles = async () => {
    const response = await axios.get(api.url + '/api/niveles/leerNiveles')
    return response.data

}

export default {
    getContenido,
    getContenidoV2,
    getNiveles,
    crearContenido,
    editarContenido
}