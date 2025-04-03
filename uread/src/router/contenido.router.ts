import axios from "axios"
import { Contenido } from "../interfaces/Contenido.interface"
import { api } from "../configuration/environments";

const crearContenido = async (contenido: Contenido) => {
    const response = await axios.post(api.url + '/api/contenido/crearContenido', contenido)
    return response.data
}

const editarContenido = async (contenido: Contenido) => {
    const response = await axios.post(api.url + '/api/contenido/editarContenido', contenido)
    return response.data
}

const getContenido = async (idGrupos: string[]) => {
    console.log(idGrupos)
    const response = await axios.post(api.url + `/api/contenido/leerContenidos`, {idGrupos})
    return response.data
}

const getTodoContenido = async () => {
    const response = await axios.get(api.url + `/api/contenido/getTodoContenido`)
    return response.data
}

const getContenidoV2 = async () => {
    const response = await axios.get(api.url + '/api/contenido/leerContenidosV2')
    return response.data
}

const getNiveles = async () => {
    const response = await axios.get(api.url + '/api/niveles/leerNiveles')
    return response.data

}

const getGruposNiveles = async () => {
    const response = await axios.get(api.url + '/api/niveles/gruposNiveles')
    return response.data

}

export default {
    getContenido,
    getTodoContenido,
    getContenidoV2,
    getNiveles,
    crearContenido,
    editarContenido,
    getGruposNiveles
}