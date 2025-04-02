import axios from 'axios'
import { User } from '../interfaces/User.interface'
import { api } from "../configuration/environments";

const login = async (email: string, password: string) => {
    const response = await axios.post(api.url + '/api/login', {email: email, password: password})
    return response.data
}

const resendVerification = async (user: User) => {
    const response = await axios.post(api.url + '/api/resendVerification', {user: user})
    return response.data
}

const createUser = async (user: User) => {
    const response = await axios.post(api.url + '/api/users/createUser', user)
    return response.data
}

const editUser = async (user: User) => {
    const response = await axios.post(api.url + '/api/users/editUser', user)
    return response.data
}

const getUsers = async () => {
    const response = await axios.get(api.url + '/api/users/getUsers')
    return response.data
}

const getUser = async (id: string) => {
    const response = await axios.post(api.url + '/api/users/getUserById', {id: id})
    return response.data
}

const deleteUser = async (_id: string) => {
    const response = await axios.post(api.url + '/api/users/deleteUser', {_id: _id})
    return response.data
}

const signUpUser = async (user: User) => {
    const response = await axios.post(api.url + '/api/signup', user)
    return response.data
}

const veryfyUser = async (token: string) => {
    const response = await axios.post(api.url + '/api/verify', {token: token})
    return response.data
}

const resetPassword = async (email: string) => {
    const response = await axios.post(api.url + '/api/forgot-password', {email: email})
    return response.data
}

const restorePassword = async (token: string, password: string) => {
    const response = await axios.post(api.url + '/api/reset-password', {token: token, password: password})
    return response.data
}

const cambiarPassword = async (userId: string, password: string) => {
    const response = await axios.post(api.url + '/api/users/cambiar-password', {userId, password})
    return response.data
}

const enviarValidacionUsuario = async (usuario: User) => {
    const response = await axios.post(api.url + '/api/users/validarUsuario', {usuario})
    return response.data
}

const habilitarUsuarioDesdeAlumno = async (alumno: User) => {
    const response = await axios.post(api.url + '/api/users/habilitarUsuarioDesdeAlumno', {alumno})
    return response.data
}

const usuarioDesdeToken = async (token: string) => {
    const response = await axios.get(api.url + `/api/users/usuarioDesdeToken/${token}`)
    return response.data
}

const alumnosPorApoderado = async (userId: string ) => {
    const response = await axios.get(api.url + `/api/users/alumnos-usuario?idUser=${userId}`)
    return response.data
}

const todosLosAlumnos = async () => {
    const response = await axios.get(api.url + `/api/users/alumnos`)
    return response.data
}

const editarAlumno = async (alumno: any) => {
    const response = await axios.post(api.url + `/api/users/edit-alumno`, {alumno})
    return response.data

}

export default {
    login,
    resendVerification,
    createUser,
    editUser,
    getUser,
    getUsers,
    deleteUser,
    signUpUser,
    veryfyUser,
    resetPassword,
    restorePassword,
    enviarValidacionUsuario,
    habilitarUsuarioDesdeAlumno,
    cambiarPassword,
    usuarioDesdeToken,
    alumnosPorApoderado,
    todosLosAlumnos,
    editarAlumno
}