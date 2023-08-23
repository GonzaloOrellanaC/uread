import { ObjectId } from 'mongoose'
import { Organization, Role } from './roles.interface'
export interface User {
    _id: ObjectId
    idUser: number
    name: string
    lastName: string
    secondLastName: string
    run?: string
    phone: string
    direction: string
    region: string
    city: string
    nacionality: string
    email: string
    password: string,
    emailVerifiedAt: Date
    state: boolean
    profileImage: string
    roles: Role[]
    organization: Organization[]
    levelUser?: number
    premium: boolean
    createdAt: Date
    updatedAt: Date
}

export interface LoginData {
    email: string
    password: string
}
