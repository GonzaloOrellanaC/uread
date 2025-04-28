/// <reference types="qs" />
/// <reference types="cookie-parser" />
import { NextFunction, Request, Response } from 'express';
declare const _default: {
    leerContenidos: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
};
export default _default;
