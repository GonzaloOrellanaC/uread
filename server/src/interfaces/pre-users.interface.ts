import { ObjectId } from "mongoose";

export interface PreUser {
    _id?: ObjectId
    name?: string
    run: string | number
    activated?: boolean
    idPreUser?: number
    createdAt?: Date
    updatedAt?: Date
}