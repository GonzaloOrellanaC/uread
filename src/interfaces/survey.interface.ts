import { ObjectId } from "mongoose"
import { Organization } from "./roles.interface"
import { User } from "./users.interface"

export interface Survey {
    _id: ObjectId
    organization: Organization[]
    createdAt: Date
    updatedAt: Date
    createdBy: User
    updatedBy: User
    state: boolean
    users: User[]
    questions: Question[]
    idSurvey: number
}

export interface Question {
    _id: string
    description: string
    alternatives: Alternative[]
    multiple: boolean
}

export interface Alternative {
    _id: string
    description: string
}

export interface SurveyResponse {
    _id: ObjectId
    survey: ObjectId
    createdBy: User | ObjectId
    updatedBy: User
    responses: any[]
}