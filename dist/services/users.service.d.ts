/// <reference types="mongoose" />
import { User } from '../interfaces/users.interface';
declare const _default: {
    findAllUser: () => Promise<User[]>;
    findAllAdminUser: () => Promise<User[]>;
    findSupervisores: () => Promise<User[]>;
    findAllSystemUser: () => Promise<User[]>;
    getUsersByOrg: (orgId: import("mongoose").Schema.Types.ObjectId) => Promise<User[]>;
    findOperadores: () => Promise<User[]>;
    findUserById: (userId: string) => Promise<User>;
    editUser: (usuario: User, locale?: string) => Promise<User>;
    findUsersByRole: (role: string) => Promise<User[]>;
    createUser: (userData: User, locale?: string) => Promise<User>;
    createAdminSysUser: (userData: User, locale?: string) => Promise<User>;
    updateUser: (userId: string, userData: User, locale?: string) => Promise<User>;
    deleteUser: (userId: string, locale?: string) => Promise<User>;
    validar: (user: User) => Promise<User>;
};
export default _default;
