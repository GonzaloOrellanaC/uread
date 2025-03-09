import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
declare const _default: {
    createRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getRolesByOrg: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getRolesAdmin: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getAllRoles: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    updateRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    deleteRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    createGlobalRole: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getMyRoles: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
};
export default _default;
