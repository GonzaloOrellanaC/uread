/// <reference types="mongoose" />
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { LoginData, User } from '../interfaces/users.interface';
declare const _default: {
    signup: (userData: User) => Promise<{
        cookie: string;
        createdUser: User;
    }>;
    resendVerification: (userData: User) => Promise<{
        cookie: string;
        user: User;
    }>;
    login: (userData: LoginData, locale?: string) => Promise<{
        cookie: string;
        findUser: User;
        token: {
            expiresIn: number;
            token: string;
        };
    }>;
    logout: (userData: User, locale?: string) => Promise<User>;
    verifyUserEmail: (userId: import("mongoose").Schema.Types.ObjectId) => Promise<User & import("mongoose").Document<any, any, any>>;
    forgotPassword: (email: string) => Promise<User>;
    resetPassword: (token: string, password: string) => Promise<User>;
    createToken: (user: User, expiresIn?: number) => {
        expiresIn: number;
        token: string;
    };
    verifyToken: (token: string, ignoreExpiration?: boolean) => DataStoredInToken;
    createCookie: (tokenData: TokenData) => string;
};
export default _default;
