import axios from 'axios'
import { User } from '../interfaces/User.interface'

const login = async (email: string, password: string) => {
    const response = await axios.post('/api/login', {email: email, password: password})
    return response.data
}

const resendVerification = async (user: User) => {
    const response = await axios.post('/api/resendVerification', {user: user})
    return response.data
}

const createUser = async (user: User) => {
    const response = await axios.post('/api/users/createUser', user)
    return response.data
}

const editUser = async (user: User) => {
    const response = await axios.post('/api/users/editUser', user)
    return response.data
}

const getUsers = async () => {
    const response = await axios.get('/api/users/getUsers')
    return response.data
}

const getUser = async (id: string) => {
    const response = await axios.post('/api/users/getUserById', {id: id})
    return response.data
}

const deleteUser = async (_id: string) => {
    const response = await axios.post('/api/users/deleteUser', {_id: _id})
    return response.data
}

const signUpUser = async (user: User) => {
    const response = await axios.post('/api/signup', user)
    return response.data
}

const veryfyUser = async (token: string) => {
    const response = await axios.post('/api/verify', {token: token})
    return response.data
}

const resetPassword = async (email: string) => {
    const response = await axios.post('/api/forgot-password', {email: email})
    return response.data
}

const restorePassword = async (token: string, password: string) => {
    const response = await axios.post('/api/reset-password', {token: token, password: password})
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
    restorePassword
}