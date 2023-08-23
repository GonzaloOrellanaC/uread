import { NextFunction, Response } from 'express';
import { RequestWithUser } from "../interfaces/auth.interface";
declare const _default: {
    createSurvey: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    editSurvey: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getSurveys: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getSurveysByAdmins: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getSurveyById: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    getSurveyByOrganizationId: (req: RequestWithUser, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
};
export default _default;
