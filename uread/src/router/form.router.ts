import axios from "axios";
import { api } from "../configuration/environments";

export const formularioInscripcion = async (data: any) => {
    const response = await axios.post(api.url + '/api/form', data)
    return response.data
}