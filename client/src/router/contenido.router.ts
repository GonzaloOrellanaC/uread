import axios from "axios"

const getContenido = async (premium: boolean) => {
    if (premium) {
        const response = await axios.get('/api/contenido/leerContenidos')
        return response.data
    } else {
        const response = await axios.get('/api/contenido/leerContenidosBasicos')
        return response.data
    }
}

export default {
    getContenido
}