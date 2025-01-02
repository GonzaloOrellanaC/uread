import axios from "axios"

const createMeeting = async (data: any) => {
    const response = await axios.post('/api/calendar/createMeeting', data)
    return response.data
}

const getMeetings = async () => {
    const response = await axios.get('/api/calendar/getMeetings')
    return response.data
}

export default {
    createMeeting,
    getMeetings
}