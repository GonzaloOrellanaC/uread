import { ObjectId } from 'mongoose'
import { LatLng, Project } from './project.interface'
import { User } from './users.interface'

export interface Organization {
    _id: ObjectId
    name: string
    description?: string
    state: boolean
    contracts: Contract[]
    imageBgLoginUrl: string[]
    themes: string[]
    logoUrl: string
    idOrg: number
    nation: string
    region: string
    city: string
    address: string
    phone: string
    email: string
    coords: LatLng
    users: User[]
    createdAt: Date
    updatedAt: Date
}

export interface Contract {
    init: Date
    finish: Date
    contractDescription: string
    projects: Project[]
}

export interface Role {
    _id: ObjectId
    name: string
    /* resources: object
    organizationId: ObjectId
    description: string */
}

export interface RoleId {
    _id: ObjectId
}
