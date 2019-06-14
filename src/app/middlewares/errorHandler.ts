import { ServiceUnavailable } from '../errors';
import { BAD_REQUEST_CODE } from '../configs/status-codes';
import { Request, Response, NextFunction } from "express";
import { Error } from '../../interfaces/globals';

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) {
        next(new ServiceUnavailable(err.message));
    }

    let status: number = err.status || BAD_REQUEST_CODE;

    return res.status(status).json({
        status: status,
        message: err.message || '',
        errors: err.errors || null,
        body: req.body
    });
};
