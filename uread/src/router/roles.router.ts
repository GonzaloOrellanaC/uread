import axios from 'axios'
import { api } from "../configuration/environments";

const getRoles = async () => {
    const response = await axios.get(api.url + '/api/roles/getRoles')
    return response.data
}

export default {
    getRoles
}