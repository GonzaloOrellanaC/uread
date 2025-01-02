import axios from "axios"
import { api } from "../configuration/environments";

const createMeeting = async (data: any) => {
    const response = await axios.post(api.url + '/api/calendar/createMeeting', data)
    return response.data
}

const getMeetings = async () => {
    const response = await axios.get(api.url + '/api/calendar/getMeetings')
    return response.data
}

export default {
    createMeeting,
    getMeetings
}