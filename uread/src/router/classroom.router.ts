import axios from "axios";
import { api } from "../configuration/environments";

const guardarClassroom = async (classRoomList: any[]) => {
    const response = await axios.post(api.url + '/api/classroom/guardar-classrooms', {classRoomList})
    return response.data
}

const obteneClassrooms = async () => {
    const response = await axios.get(api.url + '/api/classroom/get-classrooms')
    return response.data
}

const obteneClassroomsPorNivelPlan = async (plan: any, nivel: any) => {
    const response = await axios.get(api.url + `/api/classroom/leer-classrooms-por-nivel-plan?nivel=${nivel}&plan=${plan}`)
    return response.data
}

export default {
    guardarClassroom,
    obteneClassrooms,
    obteneClassroomsPorNivelPlan
}