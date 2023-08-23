import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
/**
 * Middleware that grants or deny access
 * @param  {string=null} action action to perform
 * @param  {string=null} resource resource to access
 */
declare const grantAccess: (action?: string, resource?: string) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Middleware that grants or deny access if the user is super admin
 */
declare const superAdminAccess: () => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export { grantAccess, superAdminAccess };
