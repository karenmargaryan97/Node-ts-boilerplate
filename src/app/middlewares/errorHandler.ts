import { ServiceUnavailable } from '../errors';
import { BAD_REQUEST_CODE } from '../configs/status-codes';
import { Request, Response, NextFunction } from 'express';
import { IError } from '../../interfaces/globals';

export default async (err: IError, req: Request, res: Response, next: NextFunction): Promise<Response> => {
    if (!err.status) {
        next(new ServiceUnavailable(err.message));
    }

    const status: number = err.status || BAD_REQUEST_CODE;

    return res.status(status).json({
        body: req.body,
        errors: err.errors || null,
        message: err.message || '',
        status
    });
};
