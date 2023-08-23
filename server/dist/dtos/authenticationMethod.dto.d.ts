import { ObjectId } from 'mongoose';
export declare class AddAutheticationMethodDto {
    userId: ObjectId;
    type: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export declare class UpdateAutheticationMethodDto {
    userId: ObjectId;
    type: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export declare class DeleteAutheticationMethodDto {
    userId: ObjectId;
    type: string;
}
