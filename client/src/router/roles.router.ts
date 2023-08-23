import axios from 'axios'

const getRoles = async () => {
    const response = await axios.get('/api/roles/getRoles')
    return response.data
}

export default {
    getRoles
}