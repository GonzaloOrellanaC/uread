import { ObjectId } from 'mongoose';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Array<string>;
}
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    password: string;
    roles: Array<ObjectId>;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class addRoleDto {
    _id: string;
}
