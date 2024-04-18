import express, { Express, Request, Response, NextFunction } from 'express';

import logger from "./utils/logger";
import { errorCodePrefixes } from './namespaces';

export class crashHandler {
    public static mainFunctionExited(err: Error): CrashHandler {
        logger.error(err);
        return {
            message: "main Function exited with error",
            err,
            code: errorCodePrefixes.mainProcess_std + "100" 
        }
    }

    public static RedisClientUnkown(err:Error) {
        logger.error(`[RedisClient_std]: Unknown:\n${err}`)
        return {
            message: "Undocumented Error",
            err,
            code: errorCodePrefixes.RedisClient_std + "100" 
        }
    }

    public static DB = {
        general: {
            100: (err: Error) => {
                logger.error(`[DB_Std]: Object could not be located!\n${err}`);
                return {
                    message: "Unknown object identifier",
                    err,
                    code: errorCodePrefixes.DB_std + "100"
                }
            }
        },
        Users: {
            100: (err: Error) => {
                logger.error(`[UserDb_Std]: User not found!\n${err}`);
                return {
                    message: "Unknown user",
                    err,
                    code: errorCodePrefixes.userDb_std + "100"
                }
            }
        }
    }

    public static webResponseError(returnObject: WebResponse, req: Request, res: Response, next?: NextFunction) {
        const http_type = returnObject.code.startsWith(String(errorCodePrefixes.http_std)) ? "http_std" : "http_cust"
        logger.error(`[${http_type}]: ${returnObject.err}`);
        res.status(returnObject.resCode).json(returnObject);
        return returnObject
    }

    public static webResponseCodes = {
        404: (err: Error, req: Request, res: Response, next?: NextFunction) => this.webResponseError({
            resCode: 404,
            message: "Not Found",
            err,
            code: errorCodePrefixes.http_std + "404"
        },req,res,next)
    }
}

export interface CrashHandler {
    message: string;
    err: Error;
    code: string;
}
export interface WebResponse {
    resCode: number;
    message: string;
    err: Error;
    code: string;
}