export interface User {
    id?: number
    _id: string
    idUser: number
    name: string
    lastName: string
    secondLastName: string
    run: string
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
    roles: any[]
    organization: any[]
    levelUser?: number
    premium: boolean
    createdAt: Date
    updatedAt: Date
}