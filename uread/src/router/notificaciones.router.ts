import axios from 'axios'
import { api } from "../configuration/environments";

const getNotificacionesPorUsuario = async (userId: string, skip: number, limit: number) => {
    const response = await axios.get(api.url + `/api/notificaciones/getNotifications?userId=${userId}&skip=${skip}&limit=${limit}`)
    return response.data
}

const editNotificacion = async (notificacion: any) => {
    const response = await axios.put(api.url + `/api/notificaciones/`, notificacion)
    return response.data
}

export default {
    getNotificacionesPorUsuario,
    editNotificacion
}